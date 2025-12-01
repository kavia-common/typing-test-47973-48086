import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './store/AuthContext';
import { ToastsProvider } from './components/Toasts';

import Home from './pages/Home';
import Tests from './pages/Tests';
import TestPlay from './pages/TestPlay';
import Results from './pages/Results';
import ResultDetail from './pages/ResultDetail';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Admin from './pages/Admin';

// PUBLIC_INTERFACE
function App() {
  /** Main App entry with theming toggle and all routes */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ToastsProvider>
            <header>
              <Navbar />
              <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </header>
            <main style={{ minHeight: '70vh' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/tests/:id" element={<TestPlay />} />
                <Route path="/results" element={<Results />} />
                <Route path="/results/:id" element={<ResultDetail />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth/login" element={<AuthLogin />} />
                <Route path="/auth/register" element={<AuthRegister />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </ToastsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
