# API Contract: Todo Application with Authentication

## Authentication Requirements
All API endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Base URL
`/api/{user_id}/tasks`

## Endpoints

### GET /api/{user_id}/tasks
**Description**: List all tasks for a specific user
**Headers**: Authorization: Bearer <token>
**Path Parameters**:
- user_id: String (user identifier from JWT)
**Response**: 200 OK with array of Task objects
**Validation**: user_id in path must match user_id in JWT token

### POST /api/{user_id}/tasks
**Description**: Create a new task for the user
**Headers**: Authorization: Bearer <token>
**Path Parameters**:
- user_id: String (user identifier from JWT)
**Request Body**:
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "completed": "boolean (optional, default: false)"
}
```
**Response**: 201 Created with created Task object
**Validation**: user_id in path must match user_id in JWT token

### GET /api/{user_id}/tasks/{id}
**Description**: Get details of a specific task
**Headers**: Authorization: Bearer <token>
**Path Parameters**:
- user_id: String (user identifier from JWT)
- id: Integer (task identifier)
**Response**: 200 OK with Task object
**Validation**: user_id in path must match user_id in JWT token, task must belong to user

### PUT /api/{user_id}/tasks/{id}
**Description**: Update an existing task
**Headers**: Authorization: Bearer <token>
**Path Parameters**:
- user_id: String (user identifier from JWT)
- id: Integer (task identifier)
**Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```
**Response**: 200 OK with updated Task object
**Validation**: user_id in path must match user_id in JWT token, task must belong to user

### DELETE /api/{user_id}/tasks/{id}
**Description**: Delete a specific task
**Headers**: Authorization: Bearer <token>
**Path Parameters**:
- user_id: String (user identifier from JWT)
- id: Integer (task identifier)
**Response**: 204 No Content
**Validation**: user_id in path must match user_id in JWT token, task must belong to user

### PATCH /api/{user_id}/tasks/{id}/complete
**Description**: Toggle completion status of a task
**Headers**: Authorization: Bearer <token>
**Path Parameters**:
- user_id: String (user identifier from JWT)
- id: Integer (task identifier)
**Response**: 200 OK with updated Task object
**Validation**: user_id in path must match user_id in JWT token, task must belong to user

## Error Responses
- 401 Unauthorized: Invalid or missing JWT token
- 403 Forbidden: user_id mismatch between path and JWT token
- 404 Not Found: Requested task does not exist
- 422 Unprocessable Entity: Invalid request body format

## Task Object Schema
```json
{
  "id": "integer",
  "user_id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "datetime string",
  "updated_at": "datetime string"
}
```