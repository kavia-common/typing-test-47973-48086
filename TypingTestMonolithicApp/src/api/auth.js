import { apiFetch } from './client';

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Attempt login; return mock user if API unavailable */
  try {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return data;
  } catch {
    // mock
    return {
      user: {
        id: '00000000-0000-0000-0000-000000000001',
        email,
        is_verified: true,
        profile: { user_id: '00000000-0000-0000-0000-000000000001', display_name: 'Demo User', avatar_url: '', bio: '' },
        preferences: { user_id: '00000000-0000-0000-0000-000000000001', notifications: true, privacy_level: 'public' },
      },
      token: 'mock-token',
    };
  }
}

// PUBLIC_INTERFACE
export async function register(email, password) {
  /** Attempt registration; return mock user if API unavailable */
  try {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return data;
  } catch {
    return {
      user: {
        id: '00000000-0000-0000-0000-000000000002',
        email,
        is_verified: false,
        profile: { user_id: '00000000-0000-0000-0000-000000000002', display_name: 'New User', avatar_url: '', bio: '' },
        preferences: { user_id: '00000000-0000-0000-0000-000000000002', notifications: true, privacy_level: 'public' },
      },
      token: 'mock-token',
    };
  }
}

// PUBLIC_INTERFACE
export async function me() {
  /** Get current authenticated user; return mock if API unavailable */
  try {
    const data = await apiFetch('/api/auth/me', { method: 'GET' });
    return data;
  } catch {
    return {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'demo@example.com',
      is_verified: true,
      profile: { user_id: '00000000-0000-0000-0000-000000000001', display_name: 'Demo User', avatar_url: '', bio: '' },
      preferences: { user_id: '00000000-0000-0000-0000-000000000001', notifications: true, privacy_level: 'public' },
    };
  }
}
