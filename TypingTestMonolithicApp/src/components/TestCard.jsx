import React from 'react';
import { Link } from 'react-router-dom';

export default function TestCard({ test }) {
  return (
    <div style={styles.card}>
      <h3 style={{ margin: '8px 0' }}>{test.title}</h3>
      <p style={{ margin: '8px 0', opacity: 0.8 }}>{test.description}</p>
      <div style={{ fontSize: 14, opacity: 0.8 }}>Duration: {test.duration_seconds}s</div>
      <div style={{ marginTop: 12 }}>
        <Link to={`/tests/${test.id}`} style={styles.btn}>Start</Link>
      </div>
    </div>
  );
}

const styles = {
  card: { border: '1px solid var(--border-color)', padding: 16, borderRadius: 8, background: 'var(--bg-secondary)', textAlign: 'left' },
  btn: { padding: '8px 12px', background: 'var(--button-bg)', color: 'var(--button-text)', borderRadius: 6, textDecoration: 'none' },
};
