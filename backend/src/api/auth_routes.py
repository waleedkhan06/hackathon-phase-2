from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlmodel import Session, select
from typing import Optional

from src.models.user import User
from src.services.auth_service import create_access_token, get_current_user, hash_password, verify_password
from src.services.database import get_session

router = APIRouter(prefix="", tags=["auth"])

@router.post("/auth/login")
def login_user(email: str = Body(...), password: str = Body(...), session: Session = Depends(get_session)):
    """Login user with email and password and return JWT token"""
    # Find user by email
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Verify password
    if not verify_password(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Create access token with user ID as subject
    access_token = create_access_token(data={"sub": user.id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email
    }

@router.post("/auth/register")
def register_user(email: str = Body(...), password: str = Body(...), session: Session = Depends(get_session)):
    """Register a new user with email and password"""
    # Check if user already exists
    statement = select(User).where(User.email == email)
    existing_user = session.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    # Hash the password
    hashed_password = hash_password(password)

    # Create new user
    user = User(email=email, password=hashed_password)
    session.add(user)
    session.flush()  # Flush to assign ID without committing

    # Create access token with user ID as subject
    access_token = create_access_token(data={"sub": user.id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email
    }

@router.get("/auth/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    """Get current user info from JWT token"""
    return current_user

@router.patch("/auth/update")
def update_user_profile(
    user_data: dict,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Update user profile information"""
    # Update allowed fields
    allowed_fields = {"name", "theme_preference"}

    for field, value in user_data.items():
        if field in allowed_fields and hasattr(current_user, field):
            setattr(current_user, field, value)

    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return current_user