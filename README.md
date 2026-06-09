# Nebuilding

This repository now includes the imported Halo System website and portals under `halo-system`.

## What was added

- `halo-system/backend` with a Node.js Express backend
- `halo-system/frontend` with static portal pages and admin dashboard pages
- API routing for authentication, MFA, RBAC, tickets, clients, monitoring, and portal access
- Static hosting of the frontend from the backend server
- A seeded super admin user for immediate login

## Quick start

```bash
cd halo-system/backend
npm install
npm run db:setup
npm start
```

Then open `http://localhost:3000/login.html` in your browser.

## Super Admin account

- Email: `admin@halo.local`
- Password: `SecureAdmin123!`

## Notes

- Backend API endpoints use `/api/*`
- Static pages are served from the same backend on port `3000`
- `halo-system/backend/.env.example` is provided for environment configuration
