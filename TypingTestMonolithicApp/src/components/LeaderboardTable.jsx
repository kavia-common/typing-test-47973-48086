import React from 'react';

export default function LeaderboardTable({ entries = [] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={styles.table} aria-label="Leaderboard">
        <thead>
          <tr>
            <th style={styles.th}>Rank</th>
            <th style={styles.th}>User</th>
            <th style={styles.th}>Score</th>
            <th style={styles.th}>Achieved</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td style={styles.td}>{e.rank}</td>
              <td style={styles.td}>{e.user_display_name || e.user_id}</td>
              <td style={styles.td}>{e.score}</td>
              <td style={styles.td}>{new Date(e.achieved_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', borderBottom: '1px solid var(--border-color)', padding: 8 },
  td: { borderBottom: '1px solid var(--border-color)', padding: 8 },
};
