# Architecture Overview

## Project Type

Monolithic Architecture — Single backend API server with a separate React frontend.

---

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Token (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer (memory storage)
- **Environment:** dotenv

### Frontend

- **Framework:** React.js
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Plain CSS with CSS Variables
- **Linting:** ESLint

---

## Project Structure

```
ecommerce-monolith/
├── backend/
│   └── src/
│       ├── config/         → Database connection and environment variables
│       ├── controllers/    → Request and response handling
│       ├── models/         → Mongoose schema definitions
│       ├── routes/         → Express route definitions
│       ├── middlewares/    → Auth, role and error middleware
│       ├── services/       → Business logic layer
│       ├── utils/          → Helper utilities
│       ├── validators/     → Input validation
│       ├── app.js          → Express app setup
│       └── server.js       → Server entry point
│
├── frontend/
│   └── src/
│       ├── assets/         → Images, icons, fonts
│       ├── components/     → Reusable UI components
│       ├── pages/          → Page level components
│       ├── layouts/        → Layout components
│       ├── routes/         → React Router configuration
│       ├── services/       → API call functions
│       ├── hooks/          → Custom React hooks
│       ├── context/        → React context providers
│       ├── store/          → State management
│       ├── utils/          → Helper functions
│       ├── constants/      → App wide constants
│       ├── config/         → App configuration
│       ├── styles/         → Global CSS files
│       └── types/          → Type definitions
│
└── docs/                   → Project documentation
```

---

## Backend Folder Responsibilities

| Folder       | Responsibility                                         |
| ------------ | ------------------------------------------------------ |
| config/      | MongoDB connection and environment variable exports    |
| controllers/ | Handles req and res for each feature module            |
| models/      | Mongoose schemas for all MongoDB collections           |
| routes/      | Maps URL endpoints to controller functions             |
| middlewares/ | JWT auth verification, role check, error handling      |
| services/    | Business logic decoupled from controllers              |
| utils/       | API response formatter, async wrapper, token generator |
| validators/  | Input validation before controller execution           |

---

## Frontend Folder Responsibilities

| Folder      | Responsibility                                           |
| ----------- | -------------------------------------------------------- |
| assets/     | Static files — images, icons and fonts                  |
| components/ | Reusable UI components — Button, Input, Card, Modal etc |
| pages/      | One folder per page — Home, Products, Login, Cart etc   |
| layouts/    | Header, Footer, Navbar, Sidebar, MainLayout, AuthLayout  |
| routes/     | React Router DOM route configuration                     |
| services/   | Axios or fetch based API call functions                  |
| hooks/      | Custom React hooks for reusable logic                    |
| context/    | React Context API providers                              |
| store/      | State management for auth, cart, products, orders etc    |
| utils/      | Helper functions — date, currency, string, storage      |
| constants/  | Route paths, API endpoints, storage keys, messages       |
| config/     | API config, app config, theme config                     |
| styles/     | global.css, variables.css, typography.css, theme.css     |
| types/      | TypeScript or PropTypes definitions                      |

---

## Backend Request Flow

```
React Frontend
      ↓
HTTP Request
      ↓
Express Router (routes/index.js)
      ↓
Validator Middleware
      ↓
Auth Middleware (JWT verification)
      ↓
Role Middleware (admin/vendor/customer)
      ↓
Controller (handles req and res)
      ↓
Service (business logic)
      ↓
Model (Mongoose query)
      ↓
MongoDB Database
      ↓
Response back to Frontend
```

---

## Frontend Page Flow

```
User Action
      ↓
React Page Component (pages/)
      ↓
Custom Hook or Context (hooks/ or context/)
      ↓
Service Function (services/)
      ↓
API Call to Backend
      ↓
State Update (store/)
      ↓
UI Re-render
```

---

## API Base URLs

| Environment | Backend URL           | Frontend URL          |
| ----------- | --------------------- | --------------------- |
| Development | http://localhost:5000 | http://localhost:5173 |
| Production  | To be configured      | To be configured      |

---

## Authentication Flow

```
User Login
      ↓
POST /api/auth/login
      ↓
Backend verifies email and password
      ↓
JWT token generated with userId, email and role
      ↓
Token returned to frontend
      ↓
Frontend stores token in localStorage
      ↓
Token sent in Authorization header for protected routes
      ↓
Auth middleware verifies token on every protected request
```

---

## Role Based Access Control

| Role     | Access Level                             |
| -------- | ---------------------------------------- |
| admin    | Full access to all routes                |
| vendor   | Can manage own products and categories   |
| customer | Can browse, add to cart and place orders |

---

## Modules Completed

### Backend

| Module                                                    | Status      |
| --------------------------------------------------------- | ----------- |
| Auth — register, login, profile, logout                  | ✅ Complete |
| User — CRUD with pagination, search, soft delete         | ✅ Complete |
| Product — CRUD with validation, bulk insert, soft delete | ✅ Complete |
| Category — CRUD with slug, soft delete                   | ✅ Complete |
| JWT Authentication Middleware                             | ✅ Complete |
| Role Based Access Middleware                              | ✅ Complete |
| Multer File Upload Middleware                             | ✅ Complete |
| Cart                                                      | 🔄 Pending  |
| Orders                                                    | 🔄 Pending  |
| Dashboard Summary                                         | 🔄 Pending  |

### Frontend

| Module                           | Status      |
| -------------------------------- | ----------- |
| Project setup with Vite          | ✅ Complete |
| Folder structure                 | ✅ Complete |
| Route configuration — 18 routes | ✅ Complete |
| Layout components                | ✅ Complete |
| Shared components                | ✅ Complete |
| Environment configuration        | ✅ Complete |
| Constants and utilities          | ✅ Complete |
| Global CSS styling               | ✅ Complete |
| State management structure       | ✅ Complete |
| API integration                  | 🔄 Pending  |
| Business logic                   | 🔄 Pending  |

---

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb connection string
JWT_SECRET=secret key
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

### Frontend (.env.development)

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Ecommerce Dev
VITE_APP_VERSION=1.0.0
VITE_IMAGE_BASE_URL=http://localhost:5000/images
VITE_GOOGLE_MAP_KEY=
```

# Architecture Overview

## Monolithic Architecture

This project uses a **monolithic backend architecture** built with Express.js. All features — authentication, products, categories, cart, orders, and users — live inside a single Express application.

## Folder Responsibilities

| Folder           | Responsibility                                                           |
| ---------------- | ------------------------------------------------------------------------ |
| `config/`      | Database connection and environment variable loading                     |
| `controllers/` | Request/response handling for each feature module                        |
| `models/`      | Mongoose schema definitions for MongoDB collections                      |
| `routes/`      | Express route definitions mapping URLs to controllers                    |
| `middlewares/` | Reusable middleware: auth, role-based access, error handling             |
| `services/`    | Business logic decoupled from controllers                                |
| `utils/`       | Helper utilities: API response formatter, async wrapper, token generator |
| `validators/`  | Input validation before hitting the controller                           |

## Request Flow

```
Client → Route → Validator → Middleware → Controller → Service → Model → MongoDB
```
