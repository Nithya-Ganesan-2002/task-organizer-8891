# TaskTrackr Frontend (Angular)

A lightweight, modern Angular application to organize and manage daily tasks. Features a responsive sidebar layout and core task management (create, edit, delete, toggle complete), plus filtering and sorting — implemented with an in-memory service for now.

## Quick start
- Install dependencies: `npm install`
- Start dev server: `npm start` then open http://localhost:3000/
- Build: `npm run build`

## Features implemented
- Responsive layout with sidebar and header (light theme)
- Task list with inline edit, delete, and complete toggle
- Task creation form (title, description, due date, priority)
- Filtering (query, status) and sorting (field + direction)
- In-memory TaskService with typed models (replaceable with API later)

## Project structure (key parts)
- src/app/layout: App shell with header and sidebar
- src/app/core: Task models and TaskService
- src/app/features/dashboard: Page composing filters, form, and list
- src/app/features/shared: Reusable UI components

## Theming
Primary: #1976D2, Secondary: #424242, Accent: #E91E63. CSS variables are defined in src/styles.css for easy customization.
