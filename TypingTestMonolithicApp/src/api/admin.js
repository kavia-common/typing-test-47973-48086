import { apiFetch } from './client';

// PUBLIC_INTERFACE
export async function listAdminLogs() {
  /**
   * Fetch admin action logs from the backend.
   * If the endpoint is unavailable, return mock logs to keep the UI functional.
   */
  try {
    const data = await apiFetch('/api/admin/logs', { method: 'GET' });
    return data;
  } catch {
    // Mock fallback
    return [
      {
        id: 'log-1',
        admin_id: '00000000-0000-0000-0000-000000000010',
        action: 'SEED_DATA',
        target_id: null,
        timestamp: new Date().toISOString(),
        details: 'Seeded mock data for development.',
      },
      {
        id: 'log-2',
        admin_id: '00000000-0000-0000-0000-000000000010',
        action: 'CREATE_TEST',
        target_id: '11111111-1111-1111-1111-111111111111',
        timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
        details: 'Created sample typing test.',
      },
    ];
  }
}
