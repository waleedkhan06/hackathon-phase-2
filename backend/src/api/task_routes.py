from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from src.models.task import Task
from pydantic import BaseModel
from src.models.user import User
from src.services.auth_service import get_current_user, validate_user_id, verify_token
from src.services.database import get_session

# Create Pydantic models for request bodies
class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None

router = APIRouter(prefix="/api/{user_id}", tags=["tasks"])

def verify_user_id_match(token_credentials: str, path_user_id: str) -> str:
    """Verify that the user_id in the JWT token matches the user_id in the path"""
    payload = verify_token(token_credentials)
    token_user_id = payload.get("sub")

    if not validate_user_id(token_user_id, path_user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: user_id mismatch"
        )

    return token_user_id

@router.get("/tasks", response_model=List[Task])
def read_tasks(
    user_id: str,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get all tasks for a specific user"""
    # Verify that the user_id in path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: user_id mismatch"
        )

    statement = select(Task).where(Task.user_id == user_id)
    tasks = session.exec(statement).all()
    return tasks

@router.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: str,
    task: TaskCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Create a new task for the user"""
    # Verify that the user_id in path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: user_id mismatch"
        )

    # Create task with the user_id from the path
    task_data = task.model_dump()
    db_task = Task(user_id=user_id, **task_data)

    session.add(db_task)
    session.flush()  # Flush to assign ID without committing
    return db_task

@router.get("/tasks/{id}", response_model=Task)
def read_task(
    user_id: str,
    id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get a specific task by ID"""
    # Verify that the user_id in path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: user_id mismatch"
        )

    statement = select(Task).where(Task.id == id, Task.user_id == user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return db_task

@router.put("/tasks/{id}", response_model=Task)
def update_task(
    user_id: str,
    id: int,
    task: TaskUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Update a specific task by ID"""
    # Verify that the user_id in path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: user_id mismatch"
        )

    statement = select(Task).where(Task.id == id, Task.user_id == user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update task fields
    update_data = task.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if value is not None and field != 'user_id':  # Don't allow changing user_id
            setattr(db_task, field, value)

    session.add(db_task)
    session.flush()  # Flush to ensure changes are visible
    return db_task

@router.delete("/tasks/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    user_id: str,
    id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Delete a specific task by ID"""
    # Verify that the user_id in path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: user_id mismatch"
        )

    statement = select(Task).where(Task.id == id, Task.user_id == user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    session.delete(db_task)
    # Return nothing for 204 status

@router.patch("/tasks/{id}/complete", response_model=Task)
def toggle_task_completion(
    user_id: str,
    id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Toggle the completion status of a task"""
    # Verify that the user_id in path matches the authenticated user
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: user_id mismatch"
        )

    statement = select(Task).where(Task.id == id, Task.user_id == user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Toggle completion status
    db_task.completed = not db_task.completed

    session.add(db_task)
    session.flush()  # Flush to ensure changes are visible
    return db_task