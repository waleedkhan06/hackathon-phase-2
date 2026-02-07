from fastapi import FastAPI
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from sqlmodel import SQLModel
import os
from fastapi.middleware.cors import CORSMiddleware

from src.services.database import engine
from src.models.user import User
from src.models.task import Task
from src.api.task_routes import router as task_router
from src.api.auth_routes import router as auth_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Connecting to database...")
    try:
        # Create tables if they don't exist
        SQLModel.metadata.create_all(engine)
        print("Database connection and tables creation successful!")
    except Exception as e:
        print(f"Database connection or table creation failed: {e}")
        raise
    yield
    # Shutdown
    print("Shutting down...")

app = FastAPI(
    title="Todo API",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include API routers
app.include_router(task_router)
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Include this here temporarily for testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)