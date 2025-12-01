import React from 'react';

export default function StatsPanel({ wpm, accuracy, errors, timeLeft, spark = [] }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.stat}><strong>WPM:</strong> {Math.round(wpm || 0)}</div>
      <div style={styles.stat}><strong>Accuracy:</strong> {isNaN(accuracy) ? 0 : accuracy.toFixed(1)}%</div>
      <div style={styles.stat}><strong>Errors:</strong> {errors || 0}</div>
      <div style={styles.stat}><strong>Time Left:</strong> {timeLeft || 0}s</div>
      <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
        <Sparkline data={spark} />
      </div>
    </div>
  );
}

function Sparkline({ data }) {
  const w = 200;
  const h = 40;
  const max = Math.max(1, ...data);
  const points = data.map((v, i) => {
    const x = (i / Math.max(1, data.length - 1)) * (w - 2) + 1;
    const y = h - (v / max) * (h - 2) - 1;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} role="img" aria-label="WPM over time">
      <polyline points={points} fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
    </svg>
  );
}

const styles = {
  wrap: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, alignItems: 'center' },
  stat: { padding: 8, border: '1px solid var(--border-color)', borderRadius: 8 },
};
