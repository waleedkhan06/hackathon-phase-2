# Data Model: Outstanding Frontend UI for Full-Stack Todo Application

## Core Entities

### User
Represents an authenticated user with associated preferences and authentication state

**Fields**:
- id: string - Unique identifier from authentication provider
- email: string - User's email address
- name: string | null - User's display name
- createdAt: Date - Account creation timestamp
- themePreference: 'light' | 'dark' | 'system' - User's theme preference
- isAuthenticated: boolean - Current authentication status

**Validation Rules**:
- email must be valid email format
- name must be 1-50 characters if provided
- themePreference must be one of allowed values

### Task
Represents a todo item managed by the user

**Fields**:
- id: number - Unique identifier for the task
- userId: string - Foreign key linking to user
- title: string - Task title (required)
- description: string | null - Optional task description
- completed: boolean - Completion status (default: false)
- createdAt: Date - Task creation timestamp
- updatedAt: Date - Last modification timestamp

**Validation Rules**:
- title must be 1-200 characters
- userId must match authenticated user
- createdAt and updatedAt are auto-generated
- completed is boolean

## State Transitions

### Task States
- `pending` → `completed`: When user marks task as complete
- `completed` → `pending`: When user unmarks task as complete
- `any` → `deleted`: When user deletes task

### User Authentication States
- `anonymous` → `authenticated`: After successful sign-in
- `authenticated` → `anonymous`: After sign-out

## Relationships
- User (1) : Task (Many) - One user can have many tasks
- Task belongs to one User via userId foreign key

## API Response Shapes

### Task Response
```typescript
{
  id: number,
  user_id: string,
  title: string,
  description: string | null,
  completed: boolean,
  created_at: string, // ISO date string
  updated_at: string  // ISO date string
}
```

### User Response
```typescript
{
  id: string,
  email: string,
  name: string | null
}
```

## Form Data Structures

### Create Task Form
```typescript
{
  title: string,
  description?: string
}
```

### Update Task Form
```typescript
{
  title?: string,
  description?: string,
  completed?: boolean
}
```

### Sign In Form
```typescript
{
  email: string,
  password: string
}
```

### Sign Up Form
```typescript
{
  email: string,
  password: string,
  name: string
}
```