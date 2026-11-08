import { useEffect, useRef, useState } from 'react';

export function useClock() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const started = useRef(0);
  const elapsed = useRef(0);
  useEffect(() => {
    if (!running) return;
    started.current = performance.now();
    const id = window.setInterval(() => setSeconds(Math.floor((elapsed.current + performance.now() - started.current) / 1000)), 200);
    return () => window.clearInterval(id);
  }, [running]);
  function toggle() {
    if (running) elapsed.current += performance.now() - started.current;
    setRunning(value => !value);
  }
  function reset() { elapsed.current = 0; setSeconds(0); setRunning(false); }
  return { seconds, running, toggle, reset };
}
