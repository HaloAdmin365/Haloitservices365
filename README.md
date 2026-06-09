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
- AI support is enabled with Azure OpenAI via `halo-system/backend/ai/aiService.js`

## xneelo / cPanel deployment

This project is ready for xneelo/cPanel if your plan supports Node.js apps.

1. Upload or clone the repository into your xneelo account.
2. Open cPanel and use **Setup Node.js App**.
   - Application root: `halo-system/backend`
   - Application startup file: `server.js`
   - Node version: `24`
3. Copy `.env.example` to `.env` and set production values:
   - `PORT=3000`
   - `NODE_ENV=production`
   - `JWT_SECRET=<strong-secret>`
   - `CORS_ORIGIN=https://haloitservices365.co.za`
4. Install dependencies in the backend folder and start the app.
5. Enable AutoSSL for `haloitservices365.co.za` in cPanel to secure the site.

If cPanel does not support Node apps directly, use the cPanel Terminal to run `npm install` and `npm start`, or deploy via a supported app manager.
