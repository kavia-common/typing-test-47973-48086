import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer} role="contentinfo">
      <div>© {new Date().getFullYear()} TypingTest App</div>
      <div style={{ opacity: 0.7 }}>Improve your typing speed and accuracy</div>
    </footer>
  );
}

const styles = {
  footer: { padding: '20px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' },
};
