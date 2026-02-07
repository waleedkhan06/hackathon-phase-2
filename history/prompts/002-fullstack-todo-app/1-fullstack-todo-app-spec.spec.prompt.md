---
id: 1
title: fullstack-todo-app-spec
stage: spec
date: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-fullstack-todo-app
branch: 002-fullstack-todo-app
user: Claude
command: sp.specify
labels: ["spec", "todo-app", "authentication", "backend"]
links:
  spec: specs/002-fullstack-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-fullstack-todo-app/spec.md
 - specs/002-fullstack-todo-app/checklists/requirements.md
tests:
 - No automated tests created at specification stage
---

## Prompt

sp.specify — Phase II Full-Stack Todo Web Application

## Phase
Phase II: Full-Stack Web Application

---

## Objective
Transform the existing frontend-only Todo app into a secure, multi-user, full-stack web application using spec-driven development with Claude Code + Spec-Kit Plus.

Frontend UI is already complete. Do **not** redesign UI. Only integrate authentication and backend APIs.

---

## Locked Technology Stack

### Frontend
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth (authentication)
- Existing UI (no redesign)

### Backend
- Python FastAPI
- SQLModel ORM
- Neon Serverless PostgreSQL

### Auth & Security
- Better Auth (frontend)
- JWT-based authentication
- Shared secret between frontend and backend

---

## Environment Variables (Authoritative)

```env
DATABASE_URL=postgresql://neondb_owner:npg_6zdEehmW5Tbn@ep-holy-smoke-ai50gkeg-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

BETTER_AUTH_SECRET=2SGSgrspRu4nBna7w5p6yU1Wx5oneBSE
BETTER_AUTH_URL=http://localhost:3000
Repository Structure (Spec-Kit Monorepo)
hackathon-todo/
├── .spec-kit/config.yaml
├── specs/
│   ├── overview.md
│   ├── architecture.md
│   ├── features/
│   │   ├── task-crud.md
│   │   └── authentication.md
│   ├── api/rest-endpoints.md
│   ├── database/schema.md
│   └── ui/
│       ├── pages.md
│       └── components.md
├── CLAUDE.md
├── frontend/
│   ├── CLAUDE.md
│   └── (existing Next.js app)
├── backend/
│   ├── CLAUDE.md
│   └── (FastAPI app)
Authentication Specification
Frontend
Implement Better Auth signup and signin

Enable JWT issuance on login

Attach JWT token to every API request:

Authorization: Bearer <token>
Replace mocked auth with real auth

Redirect rules:

Unauthenticated → Sign In

Authenticated → Dashboard

Backend
Verify JWT on all /api/* routes

Use BETTER_AUTH_SECRET to validate tokens

Reject unauthenticated requests (401)

Extract user ID from JWT

Enforce user ownership for all data access

REST API Specification (JWT Required)
Method    Endpoint    Description
GET    /api/{user_id}/tasks    List tasks
POST    /api/{user_id}/tasks    Create task
GET    /api/{user_id}/tasks/{id}    Task details
PUT    /api/{user_id}/tasks/{id}    Update task
DELETE    /api/{user_id}/tasks/{id}    Delete task
PATCH    /api/{user_id}/tasks/{id}/complete    Toggle completion
Rules:

user_id must match JWT user

Cross-user access is forbidden

Database Specification
users (managed by Better Auth)
id (string, primary key)

email (unique)

created_at

tasks
id (integer, primary key)

user_id (string, FK → users.id)

title (string, required)

description (text, optional)

completed (boolean, default false)

created_at

updated_at

Frontend Integration Rules
Keep existing UI and styling

Replace local state with API-driven data

Persist tasks across refresh and sessions

Use centralized API client for backend calls

Success Criteria
JWT-secured auth works end-to-end

Tasks persist in Neon PostgreSQL

Users only see their own tasks

Frontend and backend fully integrated

Specs are clear, consistent, and implementation-ready
```

## Response snapshot

Created a comprehensive specification for the full-stack todo web application with authentication. The specification includes:

1. User scenarios prioritized by importance (P1-P3) covering authentication, task management, and cross-device sync
2. Functional requirements (FR-001 through FR-012) covering authentication, authorization, CRUD operations, and data persistence
3. Key entities (User and Task) with their relationships
4. Success criteria (SC-001 through SC-006) with measurable outcomes
5. Edge cases addressing security, network failures, and token expiration

The specification adheres to the requirements by focusing on integrating authentication and backend APIs with the existing frontend UI without redesigning the UI.

## Outcome

- ✅ Impact: Created complete specification for full-stack todo application with authentication
- 🧪 Tests: No automated tests created at specification stage
- 📁 Files: Created spec.md and requirements checklist
- 🔁 Next prompts: Ready for planning phase with /sp.plan
- 🧠 Reflection: Specification covers all required aspects without implementation details

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed with planning phase