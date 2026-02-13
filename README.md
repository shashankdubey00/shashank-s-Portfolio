# MERN Portfolio - Developer Control Room

Unique portfolio with protected blog publishing and public blog reading.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Blog storage: `server/data/blogs.json`

## Local Run
1. Install dependencies:
   - `npm --prefix client install`
   - `npm --prefix server install`
2. Configure env:
   - Copy `client/.env.example` to `client/.env`
   - Copy `server/.env.example` to `server/.env`
3. Start backend:
   - `npm --prefix server run dev`
4. Start frontend:
   - `npm --prefix client run dev`

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## Render Deployment

### 1. Deploy backend (Web Service)
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `BLOG_ADMIN_SECRET` = strong secret
  - `CORS_ORIGINS` = your frontend URL (for example `https://your-frontend.onrender.com`)

Optional:
- `PORT` is auto-provided by Render.

### 2. Deploy frontend (Static Site)
- Root directory: `client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variables:
  - `VITE_API_BASE_URL` = your backend URL (for example `https://your-backend.onrender.com`)

Note: SPA routing for `/blogs/:id` is already handled by `client/public/_redirects`.

### 3. Important persistence note
Current blog storage is file-based (`server/data/blogs.json`).
- On platforms with ephemeral filesystems, blog posts may reset on restart/redeploy.
- For permanent production storage, use MongoDB (recommended) or attach persistent disk where supported.

## Private Blog Upload (Postman or script)
Public website cannot publish blogs.
Use backend API with admin secret header:
- Header: `x-admin-secret: <BLOG_ADMIN_SECRET>`
- Create: `POST /api/blogs`
- Update: `PUT /api/blogs/:id`