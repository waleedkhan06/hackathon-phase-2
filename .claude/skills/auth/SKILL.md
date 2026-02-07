# Authentication & Security Skill

## Description
Manages authentication and security for the fullstack todo application. Handles Better Auth configuration on the frontend, JWT issuance and storage, JWT verification middleware/dependency on the backend, current_user dependency, and 401/403 handling.

## Scope
- Better Auth configuration (frontend)
- JWT issuance & storage (frontend)
- JWT verification middleware/dependency (backend)
- current_user dependency
- 401/403 handling

## Critical Rules
- Shared secret: BETTER_AUTH_SECRET
- Always verify token signature & expiration
- Enforce user_id from token matches path parameter
- Never allow unauthenticated access to protected resources

## Capabilities
- Configure Better Auth on frontend
- Issue and store JWT tokens
- Verify JWT tokens on backend
- Create current_user dependency
- Handle authentication errors (401/403)
- Implement security best practices

## Use Cases
- Setting up authentication system
- Securing API endpoints
- Managing user sessions
- Handling authentication errors
- Implementing JWT-based security