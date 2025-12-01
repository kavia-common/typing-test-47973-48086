import React, { useEffect, useMemo, useRef, useState } from 'react';
import StatsPanel from './StatsPanel';
import { createResult } from '../api/results';
import { useNavigate } from 'react-router-dom';
import { useToasts } from './Toasts';

// PUBLIC_INTERFACE
export default function TypingArea({ test }) {
  /**
   * Typing engine:
   * - Tracks keystrokes, current index and errors
   * - Timer using test.duration_seconds
   * - Computes WPM and accuracy
   * - Emits per-second WPM to sparkline
   * - On completion posts result and navigates to summary page
   */
  const { text = '', duration_seconds = 60 } = test || {};
  const navigate = useNavigate();
  const { add } = useToasts();
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(duration_seconds);
  const [spark, setSpark] = useState([]);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);
  const perSecondRef = useRef(null);
  const areaRef = useRef(null);

  const correctChars = useMemo(() => {
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correct++;
    }
    return correct;
  }, [input, text]);

  const typedChars = input.length;
  const minutes = Math.max(1 / 60 / 1000, startedAt ? (Date.now() - startedAt) / 60000 : 0);
  const wpm = minutes > 0 ? (correctChars / 5) / minutes : 0;
  const accuracy = typedChars > 0 ? (correctChars / typedChars) * 100 : 100;

  useEffect(() => {
    areaRef.current?.focus();
  }, []);

  useEffect(() => {
    setTimeLeft(duration_seconds);
  }, [duration_seconds]);

  useEffect(() => {
    if (done) return;
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    if (!startedAt && input.length > 0) {
      setStartedAt(Date.now());
    }
    if (startedAt && !timerRef.current) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (startedAt && !perSecondRef.current) {
      perSecondRef.current = setInterval(() => setSpark((s) => [...s, wpm]), 1000);
    }
    return () => {};
  }, [timeLeft, startedAt, input.length, done, wpm]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (perSecondRef.current) clearInterval(perSecondRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length > text.length) return;
    // Update errors incrementally
    const lastIndex = val.length - 1;
    if (lastIndex >= 0) {
      if (val[lastIndex] !== text[lastIndex]) {
        setErrors((e) => e + 1);
      }
    }
    setInput(val);
    if (val === text) {
      onComplete();
    }
  };

  const onComplete = async () => {
    if (done) return;
    setDone(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (perSecondRef.current) clearInterval(perSecondRef.current);
    const payload = {
      user_id: 'me', // server should resolve actual user via auth; mock here
      test_id: test.id,
      wpm: Math.round(wpm),
      accuracy: Number(accuracy.toFixed(1)),
      errors,
      completed_at: new Date().toISOString(),
      summary: `Completed ${test.title} with ${Math.round(wpm)} WPM and ${accuracy.toFixed(1)}% accuracy.`,
    };
    try {
      const created = await createResult(payload);
      add('Result saved', 'success');
      navigate(`/results/${created.id}`, { state: { result: created } });
    } catch {
      add('Failed to save result (mock mode)', 'error');
      navigate(`/results/mock-${Date.now()}`, { state: { result: payload } });
    }
  };

  const reset = () => {
    setInput('');
    setErrors(0);
    setTimeLeft(duration_seconds);
    setStartedAt(null);
    setSpark([]);
    setDone(false);
    areaRef.current?.focus();
  };

  return (
    <div>
      <div aria-label="Typing text" style={styles.textBlock}>
        {text.split('').map((ch, idx) => {
          const typed = input[idx];
          let cls = '';
          if (typed == null) cls = '';
          else if (typed === ch) cls = 'correct';
          else cls = 'incorrect';
          return <span key={idx} className={cls} style={cls ? styles[cls] : undefined}>{ch}</span>;
        })}
      </div>

      <textarea
        ref={areaRef}
        aria-label="Type here"
        value={input}
        onChange={handleChange}
        placeholder="Start typing to begin..."
        style={styles.textarea}
        disabled={done}
      />

      <div style={{ marginTop: 12 }}>
        <StatsPanel wpm={wpm} accuracy={accuracy} errors={errors} timeLeft={timeLeft} spark={spark} />
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button onClick={reset} style={styles.btn}>Retry</button>
        {!done && <button onClick={onComplete} style={styles.btnSecondary}>Finish</button>}
      </div>
    </div>
  );
}

const styles = {
  textBlock: { border: '1px solid var(--border-color)', borderRadius: 8, padding: 12, minHeight: 80, textAlign: 'left', lineHeight: 1.6 },
  correct: { background: 'rgba(25, 135, 84, 0.15)' },
  incorrect: { background: 'rgba(220, 53, 69, 0.15)' },
  textarea: { width: '100%', minHeight: 120, padding: 12, borderRadius: 8, border: '1px solid var(--border-color)', marginTop: 12, fontSize: 16, lineHeight: 1.6 },
  btn: { padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', cursor: 'pointer' },
  btnSecondary: { padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--button-bg)', color: 'var(--button-text)', cursor: 'pointer' },
};
