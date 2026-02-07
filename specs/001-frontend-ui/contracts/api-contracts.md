# API Contracts: Outstanding Frontend UI for Full-Stack Todo Application

## Authentication Endpoints

### POST /api/auth/signin
Authenticate user and return JWT token

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200)**:
```json
{
  "success": true,
  "token": "jwt-token-string",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Response (401)**:
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### POST /api/auth/signup
Register new user and return JWT token

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "User Name"
}
```

**Response (201)**:
```json
{
  "success": true,
  "token": "jwt-token-string",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Response (400)**:
```json
{
  "success": false,
  "error": "Email already exists"
}
```

## Task Management Endpoints

### GET /api/v1/{user_id}/tasks
Retrieve all tasks for a specific user

**Headers**:
```
Authorization: Bearer {jwt_token}
```

**Response (200)**:
```json
{
  "tasks": [
    {
      "id": 1,
      "user_id": "user-id",
      "title": "Sample Task",
      "description": "Task description",
      "completed": false,
      "created_at": "2026-02-05T10:00:00Z",
      "updated_at": "2026-02-05T10:00:00Z"
    }
  ]
}
```

### POST /api/v1/{user_id}/tasks
Create a new task for the user

**Headers**:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```

**Response (201)**:
```json
{
  "id": 1,
  "user_id": "user-id",
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "created_at": "2026-02-05T10:00:00Z",
  "updated_at": "2026-02-05T10:00:00Z"
}
```

### PATCH /api/v1/{user_id}/tasks/{task_id}
Update an existing task

**Headers**:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request Body** (partial update):
```json
{
  "title": "Updated Task Title",
  "completed": true
}
```

**Response (200)**:
```json
{
  "id": 1,
  "user_id": "user-id",
  "title": "Updated Task Title",
  "description": "Task description",
  "completed": true,
  "created_at": "2026-02-05T10:00:00Z",
  "updated_at": "2026-02-05T11:00:00Z"
}
```

### DELETE /api/v1/{user_id}/tasks/{task_id}
Delete a task

**Headers**:
```
Authorization: Bearer {jwt_token}
```

**Response (204)**: Empty body

**Response (404)**:
```json
{
  "success": false,
  "error": "Task not found"
}
```

## User Profile Endpoints

### GET /api/v1/users/profile
Get authenticated user profile

**Headers**:
```
Authorization: Bearer {jwt_token}
```

**Response (200)**:
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "User Name",
  "created_at": "2026-02-05T10:00:00Z"
}
```

### PUT /api/v1/users/profile
Update user profile

**Headers**:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Updated Name",
  "theme_preference": "dark"
}
```

**Response (200)**:
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "Updated Name",
  "theme_preference": "dark",
  "updated_at": "2026-02-05T11:00:00Z"
}
```