# Setup Guide

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm
- Git

---

## Clone the Repository

```bash
git clone <your-repo-url>
cd ecommerce-monolith
```

---

## Backend Setup

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env
```

### 4. Fill in your .env values

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

### 5. Start the development server

```bash
npm run dev
```

### 6. Verify the server is running

```
GET http://localhost:5000/health
```

Expected:

```json
{ "success": true, "message": "Server is running" }
```

---

## Frontend Setup

### 1. Navigate to frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create `.env.development` in the frontend root folder:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Ecommerce Dev
VITE_APP_VERSION=1.0.0
VITE_IMAGE_BASE_URL=http://localhost:5000/images
VITE_GOOGLE_MAP_KEY=
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Verify the frontend is running

Open browser at:

```
http://localhost:5173
```

You should see the Home page.

---

## Running Both Servers Simultaneously

Open two separate terminals:

**Terminal 1 — Backend**

```bash
cd ecommerce-monolith/backend
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd ecommerce-monolith/frontend
npm run dev
```

| Service      | URL                          |
| ------------ | ---------------------------- |
| Backend API  | http://localhost:5000        |
| Frontend App | http://localhost:5173        |
| Health Check | http://localhost:5000/health |

---

## MongoDB Setup

### Option 1 — Local MongoDB

Install MongoDB Community Edition and use:

```
MONGO_URI=mongodb://localhost:27017/ecommerce
```

### Option 2 — MongoDB Atlas (Cloud)

1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Click Connect → Drivers
4. Copy the connection string
5. Replace in .env:

```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce
```

---

## Backend Package Scripts

| Script | Command     | Purpose                         |
| ------ | ----------- | ------------------------------- |
| Start  | npm start   | Run in production mode          |
| Dev    | npm run dev | Run with nodemon (auto restart) |

---

## Frontend Package Scripts

| Script  | Command         | Purpose                  |
| ------- | --------------- | ------------------------ |
| Dev     | npm run dev     | Start development server |
| Build   | npm run build   | Build for production     |
| Preview | npm run preview | Preview production build |
| Lint    | npm run lint    | Run ESLint               |

---

## Backend Dependencies

| Package      | Purpose                                 |
| ------------ | --------------------------------------- |
| express      | Web framework                           |
| mongoose     | MongoDB ODM                             |
| jsonwebtoken | JWT token generation and verification   |
| bcryptjs     | Password hashing                        |
| dotenv       | Environment variable loading            |
| cors         | Cross origin resource sharing           |
| multer       | File upload handling                    |
| nodemon      | Auto restart on file changes (dev only) |

---

## Frontend Dependencies

| Package          | Purpose                   |
| ---------------- | ------------------------- |
| react            | UI library                |
| react-dom        | React DOM rendering       |
| react-router-dom | Client side routing       |
| vite             | Build tool and dev server |
| eslint           | Code linting              |

---

## API Testing with Postman

### Import Collection

All API endpoints are documented in `docs/api-list.md`.

### Base URL

```
http://localhost:5000/api
```

### Authentication

For protected routes add this header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

1. Register: POST /api/auth/register
2. Login: POST /api/auth/login
3. Copy token from response
4. Add to Authorization header

---

## Folder Structure Quick Reference

```
ecommerce-monolith/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── config/
│   │   ├── styles/
│   │   └── types/
│   ├── .env
│   ├── .env.development
│   ├── .env.production
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── api-list.md
│   └── setup-guide.md
│
├── README.md
└── .gitignore
```

---

## Common Errors and Fixes

| Error                    | Cause                                  | Fix                                            |
| ------------------------ | -------------------------------------- | ---------------------------------------------- |
| Cannot find module       | File not found or wrong import path    | Check file path and spelling                   |
| MongoDB connection error | Wrong MONGO_URI or MongoDB not running | Check .env and start MongoDB                   |
| JWT secret missing       | JWT_SECRET not set in .env             | Add JWT_SECRET to .env file                    |
| Port already in use      | Another process using port 5000        | Kill the process or change PORT in .env        |
| CORS error in frontend   | Backend CORS not configured            | Check cors() middleware in app.js              |
| Vite env not loading     | Variable missing VITE_ prefix          | Add VITE_ prefix to all frontend env variables |

---

## Git Workflow

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "your commit message"

# Push to remote
git push origin main
```

# Setup Guide

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

## Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create your environment file:

   ```bash
   cp .env.example .env
   ```
4. Fill in your `.env` values:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```
5. Start the development server:

   ```bash
   npm run dev
   ```
6. Verify the server is running:

   ```
   GET http://localhost:5000/health
   ```

   Expected: `{ "success": true, "message": "Server is running" }`

## Frontend Setup

1. Navigate to the frontend folder:

   ```Shell
   cd frontend
   ```
2. Install dependencies:

   ```Shell
   npm install
   ```
3. Start the development server:

   ```Shell
   npm run dev
   ```
