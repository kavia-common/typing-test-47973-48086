import React, { createContext, useContext, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export const ToastsContext = createContext(null);

// PUBLIC_INTERFACE
export function useToasts() {
  return useContext(ToastsContext);
}

// PUBLIC_INTERFACE
export function ToastsProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = (msg, type = 'info', timeout = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), timeout);
  };
  const value = useMemo(() => ({ add }), []);
  return (
    <ToastsContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true" style={styles.container}>
        {toasts.map((t) => (
          <div key={t.id} role="status" style={{ ...styles.toast, ...styles[t.type] }}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastsContext.Provider>
  );
}

const styles = {
  container: { position: 'fixed', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999 },
  toast: { padding: '10px 12px', borderRadius: 8, color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' },
  info: { background: '#0d6efd' },
  success: { background: '#198754' },
  error: { background: '#dc3545' },
};
