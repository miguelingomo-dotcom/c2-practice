// Vercel serverless function — runs server-side, so the browser never talks
// to api.dictionaryapi.dev directly (avoids CORS and keeps the lookup logic
// in one place if we ever swap the upstream provider).
//
// Usage from the frontend: fetch(`/api/dictionary?word=${word}`)

export default async function handler(req, res) {
  const word = (req.query.word || '').trim().toLowerCase();

  if (!word) {
    res.status(400).json({ error: 'Missing "word" query parameter.' });
    return;
  }

  try {
    const upstream = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    if (upstream.status === 404) {
      res.status(404).json({ error: `No definition found for "${word}".` });
      return;
    }
    if (!upstream.ok) {
      res.status(502).json({ error: 'Dictionary service is temporarily unavailable.' });
      return;
    }

    const data = await upstream.json();
    const entry = Array.isArray(data) ? data[0] : null;
    if (!entry) {
      res.status(404).json({ error: `No definition found for "${word}".` });
      return;
    }

    const phoneticObj = (entry.phonetics || []).find((p) => p.text) || {};
    const simplified = {
      word: entry.word,
      phonetic: entry.phonetic || phoneticObj.text || null,
      audio: phoneticObj.audio || null,
      meanings: (entry.meanings || []).map((m) => ({
        partOfSpeech: m.partOfSpeech,
        definitions: (m.definitions || []).slice(0, 3).map((d) => ({
          definition: d.definition,
          example: d.example || null
        })),
        synonyms: (m.synonyms || []).slice(0, 5)
      }))
    };

    // Cache at the edge for a day — definitions don't change, no need to
    // hit the upstream API again for a word someone already looked up.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).json(simplified);
  } catch (err) {
    res.status(500).json({ error: 'Lookup failed. Please try again.' });
  }
}
