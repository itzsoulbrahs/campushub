# Campus Communities Hub

## Overview

Campus Communities Hub is a web application designed to help college students discover and join campus communities across multiple platforms (WhatsApp, Telegram, Discord, Instagram). The application functions as a centralized directory similar to Disboard.org but specifically for college groups and communities. Users can browse communities without authentication, but must sign up to list their own communities. The platform features a modern, dark-themed interface with yellow/orange accent colors and supports visibility controls (public, boys-only, girls-only) for communities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- Single-page application (SPA) architecture with client-side rendering

**Rationale**: Vite provides significantly faster development experience compared to webpack-based tools. Wouter reduces bundle size while providing necessary routing capabilities. React with TypeScript ensures maintainable, type-safe code.

**UI Component Library & Styling**
- **shadcn/ui** component library built on Radix UI primitives ("New York" style variant)
- **Tailwind CSS v4** for utility-first styling with custom design tokens
- Custom color scheme: Yellow/orange primary colors (#FFB700, #FF8C00) with dark backgrounds
- Custom fonts: Outfit (sans-serif) for body text, Space Grotesk for headings
- Responsive design with mobile-first approach

**Rationale**: shadcn/ui provides accessible, customizable components without adding package dependencies. Tailwind CSS enables rapid UI development with consistent design tokens. The dark theme with yellow accents creates a modern, campus-oriented aesthetic.

**State Management**
- **TanStack Query (React Query)** for server state management, caching, and data synchronization
- React hooks for local UI state
- No global state management library (Redux/Zustand)

**Rationale**: React Query handles all server state concerns efficiently, eliminating the need for additional state management. Local component state with hooks is sufficient for UI interactions, keeping the architecture simple.

**Form Handling**
- **React Hook Form** for form state management and performance optimization
- **Zod** for schema validation with type inference
- **@hookform/resolvers** for Zod integration

**Rationale**: React Hook Form minimizes re-renders and provides excellent performance. Zod ensures runtime type safety and provides clear validation error messages.

### Backend Architecture

**Server Framework**
- **Express.js** on Node.js for HTTP server
- TypeScript throughout the codebase
- Modular route registration system via `registerRoutes` function
- RESTful API design with `/api` prefix for all endpoints

**Rationale**: Express provides a minimal, flexible foundation for building REST APIs. The modular route registration pattern allows for clean separation of concerns and easy testing.

**Development vs Production**
- Development mode uses Vite middleware for HMR
- Production mode serves pre-built static assets from `dist/public`
- esbuild bundles server code with selective dependency bundling for faster cold starts

**Rationale**: This dual-mode approach optimizes developer experience in development while ensuring production performance through bundling and tree-shaking.

### Data Layer

**Database**
- **PostgreSQL** as the primary database (via Neon serverless)
- **Drizzle ORM** for type-safe database queries and schema management
- **Drizzle Kit** for migrations

**Schema Design**
- Users table with username/password authentication
- Schema defined in `shared/schema.ts` for sharing between client and server
- Zod schemas derived from Drizzle schemas for validation consistency

**Rationale**: PostgreSQL provides robust relational data storage. Drizzle offers TypeScript-first ORM with excellent type inference. Sharing schemas between client/server eliminates duplication and ensures consistency.

**Storage Interface**
- Abstract `IStorage` interface for CRUD operations
- `MemStorage` implementation for development/testing
- Easily swappable with database-backed implementation

**Rationale**: The storage interface pattern allows development without database setup and makes testing easier. Production can use a database-backed implementation without changing business logic.

### Routing & Navigation

**Client-Side Routing**
- Wouter for declarative route definitions
- Routes: `/` (home), `/about`, `/list-community`, `/faq`, `/login`
- 404 handling with custom NotFound page

**API Routes**
- Centralized in `server/routes.ts`
- All prefixed with `/api`
- RESTful conventions for resource management

**Rationale**: Wouter provides a minimal API similar to React Router but with much smaller bundle size. Centralizing route registration makes the API surface clear and maintainable.

### Build & Deployment

**Build Process**
- Custom build script (`script/build.ts`) coordinates client and server builds
- Client built with Vite to `dist/public`
- Server bundled with esbuild to `dist/index.cjs`
- Selective dependency bundling to reduce syscalls and improve cold start times

**Deployment Considerations**
- Static assets served directly by Express in production
- Environment variable configuration for database URLs
- Replit-specific plugins for development (cartographer, dev-banner)

**Rationale**: The custom build process optimizes for production performance while maintaining developer experience. Bundling commonly-used dependencies reduces file system overhead in serverless environments.

## External Dependencies

### Third-Party Services

**Database**
- **Neon Serverless PostgreSQL** (`@neondatabase/serverless`)
- Connection via `DATABASE_URL` environment variable
- Serverless-optimized PostgreSQL for scalable data storage

### UI Component Libraries

**Radix UI Primitives** (Multiple packages)
- Unstyled, accessible component primitives
- Used as foundation for shadcn/ui components
- Includes: Dialog, Dropdown, Accordion, Checkbox, Radio Group, Select, Tabs, Toast, Tooltip, and more

**Animation & Interaction**
- `embla-carousel-react` for carousel functionality
- `cmdk` for command palette pattern
- `framer-motion` for advanced animations (login page)

### Form & Validation

- **react-hook-form** for form state management
- **zod** for runtime schema validation
- **drizzle-zod** for deriving Zod schemas from Drizzle schemas

### Styling & Utilities

- **Tailwind CSS v4** for utility-first CSS
- **class-variance-authority** for component variant handling
- **clsx** and **tailwind-merge** for conditional className composition
- **date-fns** for date manipulation

### Development Tools

- **Replit-specific plugins**: vite-plugin-cartographer, vite-plugin-dev-banner, vite-plugin-runtime-error-modal
- Custom `vite-plugin-meta-images` for OpenGraph image URL updates
- **tsx** for running TypeScript files directly
- **drizzle-kit** for database migrations

### Session Management

- **express-session** for session handling
- **connect-pg-simple** for PostgreSQL-backed sessions

**Note**: The application structure includes session management dependencies, suggesting planned authentication implementation beyond the basic user schema currently defined.