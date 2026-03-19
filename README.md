# CraveCart

✅ User deployment: [Live user frontend](https://crave-cart-five.vercel.app/)

✅ Admin deployment: [Live admin dashboard](https://cravecart-admin.vercel.app/)

A full-stack food ordering platform with separate customer and admin React frontends and a Node.js + Express + MongoDB backend. This repo includes a complete food discovery, cart, ordering, and order-management flow.

## 🚀 Project Overview

CraveCart is built as a monorepo with three apps:
- `frontend/` — Customer-facing React app (browse food, add to cart, place orders, verify, view orders)
- `admin/` — Admin React app (manage menu items, view orders,update order status)
- `backend/` — Node.js + Express API with MongoDB, JWT auth, Cloudinary image upload

## 🧭 Features

- User signup/login with JWT
- Menu browsing, add/remove food items to cart
- Order placement, order history, order tracking
- Admin panel for food management
- Cloudinary image hosting integration
- Local dev environment ready with environment variable configs

## 🧱 Technology Stack

- Frontend: React + Vite + CSS modules
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- File upload: Cloudinary
- Package manager: npm

## 📁 Repository Structure

```
CraveCart/
  backend/    # API server, controllers, models, routes
  frontend/   # User-facing React app
  admin/      # Admin React app
  README.md   # This documentation
```

## ⚙️ Environment Setup

### 1) MongoDB
- Use MongoDB Atlas or local MongoDB.
- Set connection string in backend `.env`.

### 2) Cloudinary
- Create Cloudinary account.
- Add `CLOUD_NAME`, `API_KEY`, `API_SECRET` in backend `.env`.

## 🧪 Local Run (Dev)

### Backend
```bash
cd backend
npm install
# create .env file (see backend/.env.example or route files for expected names)
npm run dev
```

### Frontend (Customer)
```bash
cd frontend
npm install
npm run dev
```

### Admin
```bash
cd admin
npm install
npm run dev
```

Then open the URLs printed by Vite (usually `http://localhost:5173` for frontend and `http://localhost:5174` for admin).

## 🔌 API Endpoints (example)

From backend at `http://localhost:4000`:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/foods`
- `POST /api/cart`
- `POST /api/orders`
- `GET /api/orders/my` (user orders)
- `GET /api/orders/` (admin orders)

## 🧩 Deployment Notes

- Build each React app (`npm run build`) and deploy to static hosting (Vercel/Netlify/Azure Static Web Apps).
- Deploy backend to a Node host (Heroku/Azure App Service/Vercel Serverless/Render) with MongoDB connection.
- Set production env vars:
  - `MONGO_URI`, `JWT_SECRET`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, `PORT`

## 🌟 Tips for Contributors

1. Start backend first.
2. Confirm `.env` values for API and DB.
3. Use Postman to test API endpoints before connecting frontend.
4. If login fails, verify token secrets and user data in MongoDB.

## 📦 Extra Notes

- If you want to run only one app, update `VITE_API_URL` in `frontend/.env` and `admin/.env` to your running backend.
- Use seeding script (`backend/seed.js`) to populate sample data quickly.

