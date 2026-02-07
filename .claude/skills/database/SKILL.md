# Database Skill

## Description
Manages database operations for the fullstack todo application using SQLModel and Neon Serverless PostgreSQL. Handles model definitions, queries, and data operations with strict user isolation.

## Technology
- SQLModel
- Neon Serverless PostgreSQL

## Rules
- Every query MUST filter by user_id = current_user_id
- Define models with proper constraints & indexes
- Use async session when appropriate
- Never trust user_id from request — always use authenticated user_id
- Return clean ORM objects or dicts

## Mandatory Fields on Task Model
- id: int PK
- user_id: str (foreign key)
- title: str not null
- description: Optional[str]
- completed: bool = False
- created_at / updated_at

## Capabilities
- Define SQLModel models with proper relationships
- Create secure, user-isolated queries
- Implement proper constraints and indexes
- Handle async database operations
- Manage database sessions

## Use Cases
- Creating database models
- Implementing secure queries with user isolation
- Setting up database relationships
- Managing database sessions
- Ensuring data integrity and security