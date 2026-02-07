# Data Model: Full-Stack Todo Web Application

## Entity: User
- **id**: String (primary key) - Unique identifier from Better Auth system
- **email**: String (unique) - User's email address for authentication
- **created_at**: DateTime - Timestamp when user account was created
- **Relationships**: One-to-many with Task entity (user has many tasks)

## Entity: Task
- **id**: Integer (primary key) - Unique identifier for each task
- **user_id**: String (foreign key) - Links task to owning user
- **title**: String (required) - Brief description of the task
- **description**: Text (optional) - Detailed information about the task
- **completed**: Boolean (default: false) - Completion status of the task
- **created_at**: DateTime - Timestamp when task was created
- **updated_at**: DateTime - Timestamp when task was last modified
- **Relationships**: Many-to-one with User entity (task belongs to one user)

## Validation Rules
- User email must be valid email format
- Task title must not be empty
- Task user_id must correspond to an existing User
- Task completion status can only be true/false

## State Transitions
- Task: incomplete → complete (when marked as done)
- Task: complete → incomplete (when unmarked)
- User: registered → active (upon successful registration)

## Constraints
- All tasks must be associated with a valid user
- Users can only access their own tasks
- Task titles must be between 1-255 characters
- Task descriptions must not exceed 1000 characters