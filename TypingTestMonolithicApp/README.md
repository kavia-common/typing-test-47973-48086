# Typing Test Monolithic App (Frontend)

This app provides a functional UI for a typing test platform with routing, API client, mock fallbacks, and a typing engine.

## Routes
- `/` Home
- `/tests` Tests catalog
- `/tests/:id` Take a test (play)
- `/results` My results
- `/results/:id` Result detail
- `/leaderboard` Leaderboard
- `/profile` Profile and preferences
- `/auth/login` Login
- `/auth/register` Register
- `/admin` Admin placeholder

## API Base
Reads REACT_APP_API_BASE or REACT_APP_BACKEND_URL; falls back to window.location.origin.
If endpoints are unavailable, the UI uses mocked data to remain functional.

## Start
- npm install
- npm start

## Notes
- Accessible typing area with live stats (WPM, accuracy, errors, timer).
- Toast notifications for feedback.
- Theme toggle (light/dark).
