# Backend Core Skill

## Description
Manages the FastAPI backend core functionality for the fullstack todo application. Handles main.py app creation, middleware, routers inclusion, dependency system (db session, current_user), security headers, CORS, exception handlers, and config & environment variable management.

## Scope
- main.py (app creation, middleware, routers include)
- Dependency system (db session, current_user)
- Security headers, CORS, exception handlers
- Config & environment variable management
- Core security.py / deps.py files

## Rules
- Use modern FastAPI patterns
- Require JWT validation for protected routes
- Always enforce user_id matching between token and path
- Never implement business endpoints — delegate to api-endpoints skill
- Coordinate with database skill for session & models
- Always produce type-hinted, PEP-8 compliant code

## Capabilities
- Create and configure FastAPI applications
- Set up middleware and security headers
- Manage dependency injection system
- Handle CORS and exception handling
- Configure environment variables and settings
- Implement security best practices

## Use Cases
- Setting up FastAPI application structure
- Configuring middleware and security
- Managing database connections
- Setting up exception handlers
- Creating dependency injection systems