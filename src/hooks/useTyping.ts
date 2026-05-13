import { useState, useEffect } from 'react';

export function useTyping(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
        if (charIdx + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(word.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
        if (charIdx <= 1) {
          setDeleting(false);
          setWordIdx((wordIdx + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}
