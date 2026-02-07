# Implementation Tasks: Full-Stack Todo Web Application with Authentication

**Feature**: 002-fullstack-todo-app | **Date**: 2026-02-06 | **Plan**: [plan.md](plan.md)
**Input**: Approved specification from `/specs/002-fullstack-todo-app/spec.md`

## Overview

Implementation of Phase II Full-Stack Todo Web Application with authentication, backend, and persistence. Following the Agentic Dev Stack workflow with Claude Code implementation only.

## Task Dependencies

- **Prerequisites**: spec.md, plan.md, research.md, data-model.md, api-contract.md
- **Output**: Running full-stack application with authentication and database persistence

---

## Task 1 — Backend Project Setup

**Objective**: Initialize FastAPI project in `/backend` with Neon PostgreSQL connection

### Acceptance Criteria
- [x] FastAPI project initialized in `/backend` directory
- [x] Environment variables loaded via python-dotenv
- [x] SQLModel configured with Neon PostgreSQL connection
- [x] Database connectivity verified and tested
- [x] Server runs without errors on port 8000

### Implementation Steps
1. Create `/backend` directory structure
2. Set up `requirements.txt` with FastAPI, SQLModel, PyJWT, python-dotenv, psycopg2-binary
3. Create main application file with basic FastAPI setup
4. Configure database connection using DATABASE_URL from environment
5. Add startup event to test database connectivity
6. Verify server runs and responds to basic requests

### Validation
- Server starts without errors
- Database connection established successfully
- Basic health check endpoint responds

---

## Task 2 — Database Models

**Objective**: Implement `User` and `Task` SQLModel models with relationships and constraints

### Acceptance Criteria
- [x] `User` model implemented with id, email, created_at fields
- [x] `Task` model implemented with id, user_id, title, description, completed, timestamps
- [x] Foreign key relationship from Task.user_id to User.id enforced
- [x] Model constraints match spec requirements
- [x] Models can be created and queried successfully

### Implementation Steps
1. Create `/backend/src/models/user.py` with User SQLModel
2. Create `/backend/src/models/task.py` with Task SQLModel
3. Implement proper relationships and constraints
4. Add validation rules for required fields
5. Test model creation and basic operations
6. Ensure schema matches spec requirements

### Validation
- Models create without errors
- Relationships work correctly
- Constraints enforced properly

---

## Task 3 — Authentication Infrastructure

**Objective**: Configure JWT-based authentication with Better Auth frontend and FastAPI backend verification

### Acceptance Criteria
- [x] Better Auth configured in frontend with JWT issuance
- [x] JWT verification middleware implemented in FastAPI
- [x] Tokens validated using BETTER_AUTH_SECRET
- [x] Authenticated user extracted from JWT successfully
- [x] Invalid tokens rejected with 401 status

### Implementation Steps
1. Set up Better Auth in frontend with proper configuration
2. Configure shared BETTER_AUTH_SECRET in both frontend and backend
3. Create JWT verification utility in backend
4. Implement FastAPI dependency for JWT validation
5. Create middleware to extract user from token
6. Test authentication flow with valid/invalid tokens

### Validation
- Valid JWT tokens accepted and user extracted
- Invalid/expired tokens rejected with 401
- Authentication works end-to-end

---

## Task 4 — Secure REST API Implementation

**Objective**: Implement all required API endpoints with JWT enforcement and user isolation

### Acceptance Criteria
- [x] GET `/api/{user_id}/tasks` returns user's tasks with JWT validation
- [x] POST `/api/{user_id}/tasks` creates new task with JWT validation
- [x] GET `/api/{user_id}/tasks/{id}` returns specific task with JWT validation
- [x] PUT `/api/{user_id}/tasks/{id}` updates task with JWT validation
- [x] DELETE `/api/{user_id}/tasks/{id}` deletes task with JWT validation
- [x] PATCH `/api/{user_id}/tasks/{id}/complete` toggles completion with JWT validation
- [x] User ID in path matches JWT user ID (prevents cross-user access)
- [x] Proper HTTP status codes returned (200, 201, 204, 401, 403, 404)

### Implementation Steps
1. Create `/backend/src/api/task_routes.py` with all endpoints
2. Implement JWT validation on all routes
3. Verify user_id in path matches JWT user_id
4. Implement CRUD operations for tasks
5. Add proper error handling and status codes
6. Test all endpoints with valid and invalid scenarios

### Validation
- All endpoints return correct responses
- User isolation enforced (can't access others' tasks)
- Proper error handling implemented

---

## Task 5 — Frontend Authentication Integration

**Objective**: Replace mocked auth with Better Auth integration for signup/signin flows

### Acceptance Criteria
- [x] Better Auth configured in frontend with signup/signin pages
- [x] JWT tokens issued upon successful authentication
- [x] Login flow redirects authenticated users appropriately
- [x] Logout functionality implemented
- [x] Session state managed properly

### Implementation Steps
1. Install Better Auth dependencies in frontend
2. Configure Better Auth provider in Next.js app
3. Create signup/signin pages using Better Auth components
4. Implement JWT token storage and retrieval
5. Add authentication state management
6. Test complete authentication flow

### Validation
- Users can sign up and sign in successfully
- JWT tokens stored and accessible
- Authentication state persists correctly

---

## Task 6 — Frontend API Client Integration

**Objective**: Create centralized API client that attaches JWT to requests and replaces local state

### Acceptance Criteria
- [x] Centralized API client created with JWT attachment
- [x] All local todo state replaced with API calls
- [x] Loading and error states properly handled
- [x] API responses mapped to frontend components
- [x] Backend data drives frontend UI

### Implementation Steps
1. Create `/frontend/src/lib/api-client.js` with centralized API functions
2. Implement JWT token attachment to all requests
3. Replace local state management with API calls
4. Add loading state handling
5. Implement error handling for API failures
6. Connect API responses to frontend components

### Validation
- All data comes from backend API
- JWT tokens automatically attached to requests
- Loading/error states handled gracefully

---

## Task 7 — Authorization & Routing

**Objective**: Implement secure routing with proper redirects and access control

### Acceptance Criteria
- [x] Unauthenticated users redirected to Sign In page
- [x] Authenticated users redirected to Dashboard
- [x] Protected routes inaccessible to unauthenticated users
- [x] Route guards implemented correctly
- [x] Navigation works seamlessly

### Implementation Steps
1. Implement authentication context in frontend
2. Create route guard components for protected pages
3. Set up redirect logic for auth/unauth states
4. Configure Next.js middleware for server-side protection
5. Test route protection in various scenarios
6. Ensure smooth navigation flow

### Validation
- Correct redirects happen based on auth status
- Protected routes inaccessible without auth
- Navigation works as expected

---

## Task 8 — Persistence Verification

**Objective**: Verify data persistence across sessions and enforce multi-user isolation

### Acceptance Criteria
- [x] Tasks persist across browser refresh
- [x] Tasks persist across browser sessions
- [x] Users only see their own tasks
- [x] Data remains in Neon PostgreSQL database
- [x] Cross-user data access prevented

### Implementation Steps
1. Test task persistence across page refreshes
2. Test task persistence across browser sessions
3. Verify user isolation with multiple test accounts
4. Confirm data stored in Neon database
5. Test edge cases for data access
6. Validate data integrity

### Validation
- Data persists as expected
- User isolation maintained
- Database storage confirmed

---

## Task 9 — End-to-End Validation

**Objective**: Complete validation of full implementation against Phase II requirements

### Acceptance Criteria
- [x] Full CRUD lifecycle works end-to-end
- [x] JWT enforcement validated across all flows
- [x] All Phase II acceptance criteria met
- [x] Application performs as specified in original requirements
- [x] No security vulnerabilities identified

### Implementation Steps
1. Execute full end-to-end testing of user flows
2. Validate all CRUD operations work correctly
3. Confirm JWT security measures effective
4. Verify compliance with original spec
5. Test error scenarios and edge cases
6. Document final validation results

### Validation
- All original requirements satisfied
- Application functions as intended
- Security measures effective
- Ready for next phase