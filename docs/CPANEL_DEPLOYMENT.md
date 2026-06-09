# cPanel / xneelo Node.js Deployment

This repository includes the Halo System backend and frontend in `halo-system/`.

## Exact cPanel Node.js app configuration

1. Open cPanel for your xneelo account.
2. Go to **Setup Node.js App**.
3. Create a new application with:
   - **Node.js version:** `24`
   - **Application root:** `halo-system/backend`
   - **Application URL:** `https://haloitservices365.co.za`
   - **Application startup file:** `server.js`
   - **Environment:** `production`

## Required environment variables

Create a `.env` file in `halo-system/backend` with the following values:

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=<strong-secret>
CORS_ORIGIN=https://haloitservices365.co.za
APP_URL=https://haloitservices365.co.za
AI_PROVIDER=azure
AI_FALLBACK_PROVIDERS=openai,ollama,mock
AI_MODEL=gpt-4o-mini
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=1000
AI_TIMEOUT_MS=30000
AZURE_OPENAI_ENDPOINT=<your-azure-openai-endpoint>
AZURE_OPENAI_API_KEY=<your-azure-openai-api-key>
AZURE_OPENAI_DEPLOYMENT=<your-azure-deployment-name>
AZURE_OPENAI_API_VERSION=2024-03-15-preview
SMTP_HOST=<smtp-host>
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<smtp-user>
SMTP_PASSWORD=<smtp-password>
EMAIL_FROM=no-reply@haloitservices365.co.za
```

## App setup steps

1. Upload or clone the repository to xneelo.
2. In cPanel, use Setup Node.js App and point at `halo-system/backend`.
3. Run `npm install` in the backend folder.
4. Run `npm run db:setup` in the backend folder.
5. Start the application from cPanel.
6. Enable AutoSSL for `haloitservices365.co.za`.

## Verifying the app

- `https://haloitservices365.co.za/api/status`
- `https://haloitservices365.co.za/login.html`
- `https://haloitservices365.co.za/dashboard.html`
- `https://haloitservices365.co.za/client-portal.html`

## Notes

- If cPanel terminal is available, use it to run:
  ```bash
  cd ~/path/to/halo-system/backend
  npm install
  npm run db:setup
  npm start
  ```

- If the backend is served from a Node.js app manager, the startup file must remain `server.js`.
