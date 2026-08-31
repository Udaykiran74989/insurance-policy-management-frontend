# SecureLife Insurance Frontend

Modern responsive React + TypeScript + Vite frontend for the SecureLife Insurance Policy Management System.

## Includes

- Public insurance marketing website
- Customer portal for policies, claims, premium calculation, and profile management
- Admin portal for dashboard metrics, products, customers, policies, and claims
- JWT authentication with protected customer/admin routes
- Axios API client with centralized error handling and session expiry handling
- Responsive layouts for desktop, tablet, and mobile
- Bootstrap 5 foundation with a custom SecureLife visual theme

## Requirements

- Node.js 18+
- pnpm
- SecureLife Java/Spring Boot backend running locally or at a reachable URL

## Run locally

From this directory:

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The Vite config requires `PORT` and `BASE_PATH` in the environment. For a standalone local run:

```bash
PORT=5173 BASE_PATH=/ pnpm dev
```

## Build

```bash
PORT=5173 BASE_PATH=/ pnpm build
```

## Backend connection

Set `VITE_API_BASE_URL` in `.env` to the Java backend API root. The default is:

```text
http://localhost:8080/api/v1
```

Unauthenticated marketing pages include clearly labeled demo content when the backend is unavailable. Login, registration, and authenticated portal actions always use the API and surface errors instead of pretending an operation succeeded.