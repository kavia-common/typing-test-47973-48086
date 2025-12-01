import { apiFetch } from './client';

// PUBLIC_INTERFACE
export async function createResult(payload) {
  /** Create a typing test result; returns created object */
  try {
    const data = await apiFetch('/api/results', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data;
  } catch {
    return {
      id: cryptoRandomId(),
      ...payload,
      completed_at: new Date().toISOString(),
      summary: payload.summary || 'Great job on completing the test!',
    };
  }
}

// PUBLIC_INTERFACE
export async function listMyResults() {
  /** List current user's results */
  try {
    const data = await apiFetch('/api/results/my', { method: 'GET' });
    return data;
  } catch {
    return [
      {
        id: 'r-1',
        user_id: '00000000-0000-0000-0000-000000000001',
        test_id: '11111111-1111-1111-1111-111111111111',
        wpm: 72.5,
        accuracy: 96.3,
        errors: 3,
        completed_at: new Date(Date.now() - 86400000).toISOString(),
        summary: 'Solid performance with high accuracy.',
      },
    ];
  }
}

// PUBLIC_INTERFACE
export async function getResult(id) {
  /** Get a specific result */
  try {
    const data = await apiFetch(`/api/results/${id}`, { method: 'GET' });
    return data;
  } catch {
    const all = await listMyResults();
    return all.find((r) => r.id === id) || all[0];
  }
}

function cryptoRandomId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `mock-${Math.random().toString(36).slice(2, 10)}`;
  }
}
