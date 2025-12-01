import React, { useEffect, useState } from 'react';
import { listMyResults } from '../api/results';
import { Link } from 'react-router-dom';

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const r = await listMyResults();
      setResults(r);
      setLoading(false);
    })();
  }, []);
  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>Your Results</h2>
      <ul>
        {results.map((r) => (
          <li key={r.id} style={{ marginBottom: 8 }}>
            <Link to={`/results/${r.id}`}>WPM {r.wpm}, Acc {r.accuracy}% — {new Date(r.completed_at).toLocaleString()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
