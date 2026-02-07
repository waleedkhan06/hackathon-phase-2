# Frontend Skill

## Description
Manages the Next.js frontend for the fullstack todo application. Handles pages, components, authentication flow, API client, and responsive design using TypeScript and Tailwind CSS.

## Technology
- Next.js 16+ App Router
- TypeScript (strict)
- Tailwind CSS
- Better Auth (frontend side)

## Rules
- Default to Server Components
- Use 'use client' only when necessary
- Create reusable components in /components/
- Implement typed API client in /lib/api.ts
- Attach JWT automatically to all API calls
- Protect routes (redirect to sign-in if not authenticated)
- Responsive, mobile-first design with Tailwind
- Never write backend, database or auth verification logic

## Capabilities
- Create Next.js pages and components using App Router
- Implement responsive UI with Tailwind CSS
- Handle authentication flows with Better Auth
- Create typed API clients
- Manage protected routes and redirects
- Build reusable UI components

## Use Cases
- Creating Next.js pages and layouts
- Building responsive UI components
- Implementing authentication UI
- Creating API clients for backend communication
- Setting up protected routes
- Developing mobile-first interfaces