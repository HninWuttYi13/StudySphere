# Study Notes API

A backend API built with:
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication (Access + Refresh Tokens)

## Features
- Register
- Login
- Logout
- Token Refresh
- Secure Cookie-based Authentication

## Authentication Flow
- Access token expires in 15 minutes
- Refresh token expires in 7 days
- Refresh tokens are stored in database
- On logout, refresh tokens are deleted

## Installation
1. Clone the repository
2. Install dependencies
   npm install
3. Create .env file
4. Run project
   npm run dev