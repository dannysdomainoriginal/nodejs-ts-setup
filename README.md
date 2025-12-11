# ProjectMe Backend (Node.js + TypeScript)

**Author:** Charles Daniel  
**Version:** 1.0.0  
**Date:** 5th December, 2025  

A **modern, API-only Node.js backend template** built with TypeScript, designed for fast development, strict typing, and clean architecture.

## Features

- **TypeScript-first setup** – fully typed, easy to maintain and extend.  
- **Express.js** – lightweight, flexible web framework.  
- **Logging**
  - Dev: `morgan("dev")` for HTTP requests  
  - Server: custom color-coded console logger  
  - Post-deployment: Sentry integration for production errors  
- **Security & Middleware**
  - `helmet` for HTTP headers protection  
  - `cors` configured for cross-origin requests  
  - `cookie-parser` for handling cookies  
  - Rate limiting with `express-rate-limit`  
- **File Handling** – `express-form-data` for multipart/form-data file uploads  
- **Database & ORM** – `Prisma` with PostgreSQL, SQLite, or MySQL support  
- **Real-time** – `Socket.IO` integration for live events  
- **Caching** – Redis ready for caching, session management, or pub/sub  
- **API Documentation** – `swagger-ui-express` ready for OpenAPI docs  

## Project Structure

```
C:\Users\USER\Desktop\WEB DEV\NodeJs + Ts Base Template
├── config
|  ├── cookie.config.ts
|  ├── cors.config.ts
|  ├── index.config.ts
|  └── limiter.config.ts
├── db
|  └── app.db
├── libraries
|  ├── logger.ts
|  ├── redis.ts
|  └── swagger.json
├── logs
|  ├── api
|  |  └── 2025-12-11.log
|  └── error
|     └── 2025-12-11.log
├── mail
|  ├── index.ts
|  ├── services
|  └── templates
├── package-lock.json
├── package.json
├── prisma
|  └── schema.prisma
├── prisma.config.ts
├── public
|  └── todo.md
├── README.md
├── scripts
|  ├── compile.js
|  ├── nodemon.js
|  └── split-swagger.js
├── server.ts
├── src
|  ├── controllers
|  |  └── auth.controller.ts
|  ├── middlewares
|  |  ├── auth.ts
|  |  ├── handle-errors.ts
|  |  ├── logger.ts
|  |  ├── not-found.ts
|  |  └── route-html.ts
|  ├── models
|  |  └── user.model.ts
|  └── routes
|     └── index.route.ts
├── tsconfig.json
└── types
   ├── env.d.ts
   ├── express.d.ts
   └── global.d.ts
```

## Scripts

| Script       | Description |
|-------------|-------------|
| `dev`       | Starts development server using `tsx` in watch mode |
| `watch`     | Runs custom `nodemon` watcher for live reload |
| `build`     | Compiles TypeScript, runs `tsc-alias`, and executes `scripts/compile.js` |
| `compile`   | Compiles TS, runs `tsc-alias`, and runs `dist/server.js` |
| `start`     | Runs compiled server in `dist/` |

## Dependencies

- **Runtime**  
  - Express, Prisma Client, Socket.IO, Redis, Helmet, CORS, Morgan, express-form-data  
- **Dev**  
  - TypeScript, ts-node, ts-node-dev, tsc-alias, @types packages  

> This setup ensures **strict typing, fast development, and scalable architecture** for production-ready APIs.  

## Usage

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/nodejs-ts-setup.git
   cd nodejs-ts-setup
   ```
2. Install dependencies
  ```bash
  npm install
  ```
3. Start the development server
   ```bash
   npm run dev
  ```
