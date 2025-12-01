import React, { useEffect, useState } from 'react';
import { listTests } from '../api/tests';
import TestCard from '../components/TestCard';

export default function Tests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const t = await listTests();
        setTests(t);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
      {tests.map((t) => <TestCard key={t.id} test={t} />)}
    </div>
  );
}
