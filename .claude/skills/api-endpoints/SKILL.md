# API Endpoints Skill

## Description
Handles API endpoints for the fullstack todo application, specifically managing `/api/v1/{user_id}/tasks` and sub-routes. Implements request/response models using Pydantic and business logic for task CRUD operations, including status toggle functionality.

## Scope
- `/api/v1/{user_id}/tasks` and sub-routes
- Request/response models (Pydantic)
- Business logic for task CRUD operations
- Status toggle (PATCH /complete)
- Consistent response shapes

## Rules
- Every endpoint MUST use current_user dependency
- Compare path user_id with token user_id → 403 if mismatch
- Use Pydantic for validation
- Return consistent response shapes
- Never write app setup, middleware or models — use existing from backend-core and database agents

## Capabilities
- Create, read, update, and delete task endpoints
- Toggle task completion status
- Validate request/response using Pydantic models
- Ensure proper authentication and authorization
- Return standardized API responses

## Use Cases
- Creating new task endpoints
- Implementing task management APIs
- Building secure user-isolated endpoints
- Adding validation to API routes