# Halo System Backend

This directory contains the Halo System backend API for the website and portals.

## Setup

1. Change into the backend directory:
   ```bash
   cd halo-system/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database and seed the demo super admin account:
   ```bash
   npm run db:setup
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Access

- Backend API: `http://localhost:3000/api`
- Website front-end: `http://localhost:3000/login.html`

## Super Admin Credentials

- Email: `admin@halo.local`
- Password: `SecureAdmin123!`

## Notes

- The website is served from `halo-system/frontend`.
- The backend also serves the static frontend assets.
- The app uses SQLite by default in `halo-system/backend/db/halo.db`.
