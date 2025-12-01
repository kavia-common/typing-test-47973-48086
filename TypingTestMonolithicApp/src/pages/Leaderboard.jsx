import React, { useEffect, useState } from 'react';
import { listLeaderboard } from '../api/leaderboard';
import LeaderboardTable from '../components/LeaderboardTable';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  useEffect(() => {
    (async () => {
      const res = await listLeaderboard(page, pageSize);
      setEntries(res.entries || []);
      setTotal(res.total || (res.entries || []).length);
    })();
  }, [page]);
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>Leaderboard</h2>
      <LeaderboardTable entries={entries} />
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
        <div>Page {page} / {maxPage}</div>
        <button onClick={() => setPage((p) => Math.min(maxPage, p + 1))} disabled={page >= maxPage}>Next</button>
      </div>
    </div>
  );
}
