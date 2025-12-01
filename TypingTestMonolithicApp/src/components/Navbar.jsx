import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation" style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>TypingTest</Link>
        <Link to="/tests" style={styles.link}>Tests</Link>
        <Link to="/leaderboard" style={styles.link}>Leaderboard</Link>
        <Link to="/results" style={styles.link}>Results</Link>
        <Link to="/admin" style={styles.link}>Admin</Link>
      </div>
      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.user}>Hi, {user.profile?.display_name || user.email}</span>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={logout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth/login" style={styles.link}>Login</Link>
            <Link to="/auth/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border-color)' },
  left: { display: 'flex', gap: 12, alignItems: 'center' },
  right: { display: 'flex', gap: 12, alignItems: 'center' },
  brand: { fontWeight: 700, textDecoration: 'none', color: 'var(--text-primary)' },
  link: { textDecoration: 'none', color: 'var(--text-primary)' },
  btn: { padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer' },
  user: { color: 'var(--text-secondary)' },
};
