//
// Centralized API client with environment-aware base URL and graceful fallback mocking
//

const getFeatureFlags = () => {
  try {
    const raw = process.env.REACT_APP_FEATURE_FLAGS || '[]';
    if (typeof raw === 'string') {
      return JSON.parse(raw);
    }
  } catch {
    // ignore parse errors
  }
  return [];
};

export const FEATURE_FLAGS = getFeatureFlags();

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Determine API base URL using env vars or fallback to window.origin */
  const envBase =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    '';
  const base = envBase || (typeof window !== 'undefined' ? window.location.origin : '');
  return base.replace(/\/$/, '');
}

const API_BASE = getApiBase();

// Unified fetch wrapper that falls back to mocked data on failure
async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      credentials: 'include',
      ...options,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }
    return await res.text();
  } catch (err) {
    // Throw to caller to trigger mock fallback implemented in each API module
    throw err;
  }
}

export { apiFetch, API_BASE };
