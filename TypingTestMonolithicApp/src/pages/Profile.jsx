import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, getPreferences, updatePreferences } from '../api/profile';
import { useToasts } from '../components/Toasts';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [prefs, setPrefs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { add } = useToasts();

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      const pr = await getPreferences();
      setProfile(p);
      setPrefs(pr);
      setLoading(false);
    })();
  }, []);

  const onSaveProfile = async (e) => {
    e.preventDefault();
    const updated = await updateProfile(profile);
    setProfile(updated);
    add('Profile updated', 'success');
  };

  const onSavePrefs = async (e) => {
    e.preventDefault();
    const updated = await updatePreferences(prefs);
    setPrefs(updated);
    add('Preferences saved', 'success');
  };

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16, display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
      <form onSubmit={onSaveProfile} style={styles.card}>
        <h3>Profile</h3>
        <label>Display Name<input value={profile.display_name || ''} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} /></label>
        <label>Avatar URL<input value={profile.avatar_url || ''} onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} /></label>
        <label>Bio<textarea value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></label>
        <button type="submit">Save</button>
      </form>
      <form onSubmit={onSavePrefs} style={styles.card}>
        <h3>Preferences</h3>
        <label>Notifications
          <select value={prefs.notifications ? 'on' : 'off'} onChange={(e) => setPrefs({ ...prefs, notifications: e.target.value === 'on' })}>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </label>
        <label>Privacy Level
          <select value={prefs.privacy_level} onChange={(e) => setPrefs({ ...prefs, privacy_level: e.target.value })}>
            <option value="public">public</option>
            <option value="friends">friends</option>
            <option value="private">private</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

const styles = {
  card: { border: '1px solid var(--border-color)', padding: 16, borderRadius: 8, display: 'grid', gap: 8 },
};
