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

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
