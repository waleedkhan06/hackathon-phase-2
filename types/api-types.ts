// User-related types
export interface User {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at?: string;
  theme_preference?: 'light' | 'dark' | 'system';
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

// Task-related types
export interface Task {
  id: number;
  user_id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TasksResponse {
  success: boolean;
  tasks?: Task[];
  error?: string;
}

export interface TaskResponse {
  success: boolean;
  task?: Task;
  error?: string;
}

// Generic API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form data types
export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  name: string;
}

export interface CreateTaskFormData {
  title: string;
  description?: string;
}