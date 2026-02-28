# Study Notes API

A backend API built with:
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication (Access + Refresh Tokens)
- Zod Validation
- Secure Cookie Authentication

## Features
- Register
- Login
- Logout
- Token Refresh
- Secure Cookie-based Authentication
- Protected Routes
- Zod request validation
- Environment validation
## Authentication Flow
- Access token expires in 15 minutes
- Refresh token expires in 7 days
- Refresh tokens are stored in database
- On logout, refresh tokens are deleted
- Protected routes require valid access token
## Installation
1. Clone the repository
2. Install dependencies
   npm install
3. Create .env file
- PORT=5000
- MONGO_URL=your_url
- ACCESS_TOKEN_SECRET=secret
- REFRESH_TOKEN_SECRET=secret
- NODE_ENV=development
4. Run project
   npm run dev