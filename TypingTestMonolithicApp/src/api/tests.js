import { apiFetch } from './client';

// PUBLIC_INTERFACE
export async function listTests() {
  /** List available typing tests */
  try {
    const data = await apiFetch('/api/tests', { method: 'GET' });
    return data;
  } catch {
    // mock
    return [
      {
        id: '11111111-1111-1111-1111-111111111111',
        title: 'Classic Pangram',
        description: 'Type the quick brown fox pangram',
        duration_seconds: 60,
        text: 'The quick brown fox jumps over the lazy dog.',
        created_by: '00000000-0000-0000-0000-000000000999',
        created_at: new Date().toISOString(),
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        title: 'Short Story',
        description: 'A short passage to test consistency',
        duration_seconds: 120,
        text: 'Typing is an art of rhythm and precision.',
        created_by: '00000000-0000-0000-0000-000000000999',
        created_at: new Date().toISOString(),
      },
    ];
  }
}

// PUBLIC_INTERFACE
export async function getTest(id) {
  /** Get a specific typing test by id */
  try {
    const data = await apiFetch(`/api/tests/${id}`, { method: 'GET' });
    return data;
  } catch {
    const all = await listTests();
    return all.find((t) => t.id === id) || all[0];
  }
}
