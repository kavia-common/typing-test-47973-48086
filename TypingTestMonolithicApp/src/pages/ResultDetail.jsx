import React, { useEffect, useState } from 'react';
import { getResult } from '../api/results';
import { useLocation, useParams } from 'react-router-dom';

export default function ResultDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [result, setResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!result);

  useEffect(() => {
    if (result) return;
    (async () => {
      const r = await getResult(id);
      setResult(r);
      setLoading(false);
    })();
  }, [id, result]);

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!result) return <div style={{ padding: 16 }}>Result not found</div>;
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>Result Summary</h2>
      <p><strong>WPM:</strong> {result.wpm}</p>
      <p><strong>Accuracy:</strong> {result.accuracy}%</p>
      <p><strong>Errors:</strong> {result.errors}</p>
      <p><strong>Completed:</strong> {new Date(result.completed_at).toLocaleString()}</p>
      {result.summary && <p style={{ marginTop: 12 }}>{result.summary}</p>}
    </div>
  );
}
