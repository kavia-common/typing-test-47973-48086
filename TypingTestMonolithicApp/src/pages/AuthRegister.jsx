import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthRegister() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('new@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register(email, password);
    setLoading(false);
    nav('/profile');
  };
  return (
    <form onSubmit={submit} style={styles.form}>
      <h2>Register</h2>
      <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></label>
      <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required /></label>
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
}

const styles = { form: { maxWidth: 420, margin: '24px auto', padding: 16, border: '1px solid var(--border-color)', borderRadius: 8, display: 'grid', gap: 8 } };
