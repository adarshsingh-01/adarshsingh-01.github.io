# Adarsh Singh — Portfolio

A MERN portfolio for Adarsh Singh: React interface, Express API, and MongoDB-backed contact messages.

Live site: https://adarshsingh-01.github.io/

## Run it

```powershell
npm run install:all
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The API runs on port 5000. Vite proxies `/api` to it.

Without `MONGO_URI`, messages are saved in `server/data/messages.json`. To use MongoDB, copy `server/.env.example` to `server/.env` and set:

```
MONGO_URI=your-atlas-connection-string
ADMIN_TOKEN=a-long-random-string
```

The dev server prints an inbox token. Open [http://localhost:5173/inbox](http://localhost:5173/inbox) and paste it to read messages.

## Production

```powershell
npm run build
$env:NODE_ENV="production"
npm start
```

The API then serves the built React app from port 5000.

## What’s included

- Home, project case studies, résumé download, and a working contact form
- `GET /api/projects`, `POST /api/contact`, `GET /api/messages`, `GET /api/health`
- Rate limiting, input checks, and a private inbox token
