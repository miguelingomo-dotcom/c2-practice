import { useRef } from 'react';
import { shuffle } from './helpers';

export function useTimer() {
  const startRef = useRef(Date.now());
  function reset() {
    startRef.current = Date.now();
  }
  function elapsed() {
    return Date.now() - startRef.current;
  }
  return { reset, elapsed };
}

export function useShuffleBag(length) {
  const bagRef = useRef([]);
  function next() {
    if (length <= 1) return 0;
    if (bagRef.current.length === 0) {
      bagRef.current = shuffle([...Array(length).keys()]);
    }
    return bagRef.current.pop();
  }
  return next;
}

