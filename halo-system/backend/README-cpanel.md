# cPanel Node.js App Setup

This file describes the exact Node.js app setup for xneelo / cPanel.

## Application settings

- Application root: `halo-system/backend`
- Application startup file: `server.js`
- Node.js version: `24`
- Application environment: `production`
- App URL: `https://haloitservices365.co.za`

## Required environment variables

Create `halo-system/backend/.env` from `.env.example` and set:

- `PORT=3000`
- `NODE_ENV=production`
- `JWT_SECRET=<strong-secret>`
- `CORS_ORIGIN=https://haloitservices365.co.za`
- `APP_URL=https://haloitservices365.co.za`
- `AI_PROVIDER=azure`
- `AZURE_OPENAI_ENDPOINT=<your-azure-openai-endpoint>`
- `AZURE_OPENAI_API_KEY=<your-azure-openai-api-key>`
- `AZURE_OPENAI_DEPLOYMENT=<your-azure-deployment-name>`
- `AZURE_OPENAI_API_VERSION=2024-03-15-preview`
- `SMTP_HOST=<smtp-host>`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=<smtp-user>`
- `SMTP_PASSWORD=<smtp-password>`
- `EMAIL_FROM=no-reply@haloitservices365.co.za`

## Startup command

Use the cPanel startup file `server.js`.
If the GUI asks for the startup command, use:

```bash
node server.js
```

## Quick link checks

- `https://haloitservices365.co.za/api/status`
- `https://haloitservices365.co.za/api/ai/settings`
- `https://haloitservices365.co.za/api/auth/me`

## Notes

- The app uses SQLite in `halo-system/backend/db/halo.db`.
- If you need to reset the database, rerun `npm run db:setup`.
- This repo already supports AI via Azure OpenAI.
