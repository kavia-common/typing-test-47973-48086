import React, { useEffect, useState } from 'react';
import { listLeaderboard } from '../api/leaderboard';
import LeaderboardTable from '../components/LeaderboardTable';
import { Link } from 'react-router-dom';
import { listTests } from '../api/tests';

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [tests, setTests] = useState([]);
  useEffect(() => {
    (async () => {
      const lb = await listLeaderboard(1, 5);
      setLeaderboard(lb.entries || lb);
      const t = await listTests();
      setTests(t);
    })();
  }, []);
  return (
    <div className="container" style={styles.container}>
      <h1 className="title">Typing Test</h1>
      <p className="description">Improve your typing speed and accuracy with real-time feedback.</p>
      <div style={{ margin: '16px 0' }}>
        {tests[0] && <Link to={`/tests/${tests[0].id}`} className="btn btn-large" style={styles.cta}>Start a Test</Link>}
        {!tests[0] && <Link to="/tests" className="btn btn-large" style={styles.cta}>Browse Tests</Link>}
      </div>
      <h2 style={{ marginTop: 24 }}>Top Leaderboard</h2>
      <LeaderboardTable entries={leaderboard} />
    </div>
  );
}

const styles = {
  container: { textAlign: 'left', maxWidth: 900, margin: '0 auto', padding: 16 },
  cta: { padding: '10px 16px', background: 'var(--button-bg)', color: 'var(--button-text)', borderRadius: 8, textDecoration: 'none' },
};
