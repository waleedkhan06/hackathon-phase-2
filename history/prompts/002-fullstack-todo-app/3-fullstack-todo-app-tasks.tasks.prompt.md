---
id: 3
title: fullstack-todo-app-tasks
stage: tasks
date: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: 002-fullstack-todo-app
branch: 002-fullstack-todo-app
user: Claude
command: sp.tasks
labels: ["tasks", "todo-app", "implementation", "backend", "frontend"]
links:
  spec: specs/002-fullstack-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-fullstack-todo-app/tasks.md
tests:
 - No automated tests created at task breakdown stage
---

## Prompt

# sp.tasks — Phase II Full-Stack Todo Web Application

## Objective
Execute Phase II of the Todo application by implementing backend, authentication, API integration, and persistence according to approved specs.

All work must follow the Agentic Dev Stack workflow and be performed **only by Claude Code**.

---

## Authoritative References
Claude Code MUST read and follow:
- @specs/overview.md
- @specs/architecture.md
- @specs/features/task-crud.md
- @specs/features/authentication.md
- @specs/api/rest-endpoints.md
- @specs/database/schema.md
- Root `CLAUDE.md`
- `/frontend/CLAUDE.md`
- `/backend/CLAUDE.md`

---

## Task 1 — Backend Project Setup
- Initialize FastAPI project in `/backend`
- Configure environment loading
- Set up Neon PostgreSQL connection using SQLModel
- Verify database connectivity

**Output:** Running FastAPI server connected to Neon DB

---

## Task 2 — Database Models
- Implement `User` and `Task` SQLModel models
- Apply relationships and constraints
- Ensure schema matches @specs/database/schema.md

**Output:** Database models ready for CRUD operations

---

## Task 3 — Authentication Infrastructure
- Configure Better Auth to issue JWT tokens (frontend)
- Implement JWT verification middleware in FastAPI
- Validate JWT using shared secret
- Extract authenticated user from token

**Output:** Backend can identify authenticated users securely

---

## Task 4 — Secure REST API Implementation
Implement the following endpoints with JWT enforcement:

- GET `/api/{user_id}/tasks`
- POST `/api/{user_id}/tasks`
- GET `/api/{user_id}/tasks/{id}`
- PUT `/api/{user_id}/tasks/{id}`
- DELETE `/api/{user_id}/tasks/{id}`
- PATCH `/api/{user_id}/tasks/{id}/complete`

Rules:
- `user_id` must match JWT user
- Cross-user access must be blocked
- Return proper HTTP status codes

**Output:** Fully functional, secure REST API

---

## Task 5 — Frontend Authentication Integration
- Replace mocked auth with Better Auth
- Implement signup and signin flows
- Enable JWT issuance on login
- Handle logout and session state

**Output:** Frontend auth pages connected to real authentication

---

## Task 6 — Frontend API Client Integration
- Create centralized API client
- Attach JWT token to all requests
- Replace local todo state with backend API calls
- Handle loading and error states

**Output:** Frontend fully powered by backend data

---

## Task 7 — Authorization & Routing
- Enforce route protection
- Redirect unauthenticated users to Sign In
- Redirect authenticated users to Dashboard
- Prevent access leaks

**Output:** Secure, role-aware navigation

---

## Task 8 — Persistence Verification
- Verify tasks persist across refresh
- Verify tasks persist across sessions
- Verify multi-user isolation

**Output:** Persistent, user-isolated data storage

---

## Task 9 — End-to-End Validation
- Validate full CRUD lifecycle
- Validate JWT enforcement
- Validate Phase II acceptance criteria

**Output:** Phase II fully complete and compliant

---
## Response snapshot

Created comprehensive tasks.md file for the full-stack todo web application implementation. The file includes 9 detailed tasks covering:

1. Backend Project Setup - Initializing FastAPI with Neon PostgreSQL
2. Database Models - Implementing User and Task models with SQLModel
3. Authentication Infrastructure - Setting up JWT verification
4. Secure REST API Implementation - Building all required endpoints
5. Frontend Authentication Integration - Connecting Better Auth
6. Frontend API Client Integration - Replacing local state with API calls
7. Authorization & Routing - Implementing secure navigation
8. Persistence Verification - Ensuring data persistence and isolation
9. End-to-End Validation - Final validation of all requirements

Each task includes acceptance criteria, implementation steps, and validation requirements to guide the Claude Code implementation process.

## Outcome

- ✅ Impact: Created detailed task breakdown for full-stack todo application implementation
- 🧪 Tests: No automated tests created at task breakdown stage
- 📁 Files: Created tasks.md with comprehensive implementation guide
- 🔁 Next prompts: Ready for implementation using Claude Code
- 🧠 Reflection: Tasks are well-defined and follow the Agentic Dev Stack workflow

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation of Task 1