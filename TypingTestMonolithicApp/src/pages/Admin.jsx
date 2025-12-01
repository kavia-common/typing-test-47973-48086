import React, { useEffect, useState } from 'react';
import { listAdminLogs } from '../api/admin';

export default function Admin() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    (async () => {
      const l = await listAdminLogs();
      setLogs(l);
    })();
  }, []);
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>Admin Panel (Placeholder)</h2>
      <ul>
        {Array.isArray(logs) && logs.map((log) => (
          <li key={log.id}>
            [{new Date(log.timestamp).toLocaleString()}] {log.action} — {log.details}
          </li>
        ))}
      </ul>
    </div>
  );
}
