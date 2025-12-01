import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTest } from '../api/tests';
import TypingArea from '../components/TypingArea';

export default function TestPlay() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = await getTest(id);
      setTest(t);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!test) return <div style={{ padding: 16 }}>Test not found</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>{test.title}</h2>
      <TypingArea test={test} />
    </div>
  );
}
