import { apiFetch } from './client';

// PUBLIC_INTERFACE
export async function listAchievements() {
  try {
    const data = await apiFetch('/api/achievements', { method: 'GET' });
    return data;
  } catch {
    return [
      {
        id: 'ach-1',
        user_id: '00000000-0000-0000-0000-000000000001',
        type: 'First Test',
        awarded_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ];
  }
}
