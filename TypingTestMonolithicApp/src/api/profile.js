import { apiFetch } from './client';

// PUBLIC_INTERFACE
export async function getProfile() {
  try {
    const data = await apiFetch('/api/profile', { method: 'GET' });
    return data;
  } catch {
    return {
      user_id: '00000000-0000-0000-0000-000000000001',
      display_name: 'Demo User',
      avatar_url: '',
      bio: 'I love improving my typing speed!',
    };
  }
}

// PUBLIC_INTERFACE
export async function updateProfile(profile) {
  try {
    const data = await apiFetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
    return data;
  } catch {
    return { ...profile };
  }
}

// PUBLIC_INTERFACE
export async function getPreferences() {
  try {
    const data = await apiFetch('/api/preferences', { method: 'GET' });
    return data;
  } catch {
    return {
      user_id: '00000000-0000-0000-0000-000000000001',
      notifications: true,
      privacy_level: 'public',
    };
  }
}

// PUBLIC_INTERFACE
export async function updatePreferences(preferences) {
  try {
    const data = await apiFetch('/api/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
    return data;
  } catch {
    return { ...preferences };
  }
}
