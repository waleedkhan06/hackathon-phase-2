# Quickstart Guide: Full-Stack Todo Application

## Prerequisites
- Node.js 18+ for frontend
- Python 3.11+ for backend
- Access to Neon Serverless PostgreSQL
- Better Auth account setup

## Environment Setup

### Backend
1. Create `.env` file in backend root:
```
DATABASE_URL=postgresql://neondb_owner:npg_6zdEehmW5Tbn@ep-holy-smoke-ai50gkeg-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
BETTER_AUTH_SECRET=2SGSgrspRu4nBna7w5p6yU1Wx5oneBSE
BETTER_AUTH_URL=http://localhost:3000
```

2. Install Python dependencies:
```bash
pip install fastapi sqlmodel pyjwt python-dotenv psycopg2-binary uvicorn
```

### Frontend
1. Install Node dependencies:
```bash
npm install better-auth @better-auth/react
```

2. Configure Better Auth in frontend with shared secret

## Running the Application

### Backend
```bash
cd backend
uvicorn src.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm run dev
```

## API Testing
- Backend API available at http://localhost:8000
- Frontend available at http://localhost:3000
- API endpoints follow pattern: /api/{user_id}/tasks/*

## Authentication Flow
1. User registers/signs in via Better Auth
2. JWT token issued upon successful authentication
3. Token attached to all API requests as Authorization: Bearer <token>
4. Backend validates token and extracts user_id for authorization