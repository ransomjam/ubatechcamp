# UBa Tech Camp 2025 Website

## Overview
This is a full-stack web application for the UBa Tech Camp 2025 registration and information website. The application features a modern React frontend with a Node.js/Express backend, built to showcase the tech camp program and handle participant registrations. Recent enhancements include interactive floating program cards with swipe functionality across all major sections (programs, team, gallery, projects, alumni testimonials) and comprehensive alumni testimonial system with database persistence.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server
- **Tailwind CSS** for styling with a custom design system
- **shadcn/ui** component library for consistent UI components
- **Radix UI** primitives for accessible components
- **React Router (Wouter)** for client-side routing
- **React Query (TanStack Query)** for server state management
- **React Hook Form** with Zod validation for form handling
- **Framer Motion** for animations

### Backend Architecture
- **Express.js** server with TypeScript
- **PostgreSQL database** with Drizzle ORM (DatabaseStorage class)
- **Drizzle ORM** with full database persistence
- **Zod** for request validation
- RESTful API design with proper error handling

### UI Design System
- **New York** style variant from shadcn/ui
- **Neutral** base color scheme with custom CSS variables
- **CSS Variables** for theming support
- Responsive design with mobile-first approach

## Key Components

### Database Schema
- **Registrations table**: Stores participant registration data (full name, email, institution, field of study, optional referral code)
- **Newsletters table**: Stores email subscriptions for marketing
- **Testimonials table**: Stores alumni testimonials with photos, professional info, and approval system
- **Blog Posts table**: Stores blog submissions with approval workflow, categorization, tagging system, and photo upload support (featured images and content images)

### API Endpoints
- `POST /api/registration` - Create new registration
- `GET /api/registrations` - Retrieve all registrations
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/testimonials` - Submit testimonial for approval
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/blog` - Submit blog post for approval
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/unapproved` - Get pending blog posts (admin)
- `POST /api/blog/:id/approve` - Approve blog post (admin)
- Email validation and duplicate prevention

### Frontend Pages
- **Home page**: Single-page application with interactive floating card sections
  - Hero section with camp details
  - Interactive Floating Programs section with swipeable curriculum cards
  - Interactive Floating Team section with social media integration
  - Interactive Floating Gallery section with categorized photo displays
  - Interactive Floating Projects section showcasing student work
  - Interactive Floating Testimonials section with user-generated content
  - Registration form with enhanced validation
  - Contact information
- **Blog section**: Full-featured blog with user submissions and approval system
  - Blog listing page with responsive card design
  - Individual blog post pages with full content display
  - User submission form with category selection and tagging
  - Admin approval interface for managing blog submissions
  - SEO-optimized blog post URLs with slugs

### Form Handling
- **Registration form**: Validates and submits participant data
- **Newsletter subscription**: Email collection with duplicate checking
- Client-side validation with Zod schemas
- Toast notifications for user feedback

## Data Flow

1. **User Registration Flow**:
   - User fills registration form → Client validates with Zod → API validates and stores → Success feedback
   
2. **Content Display Flow**:
   - Static content served from React components → Responsive design adapts to device → Interactive elements enhance UX

3. **Newsletter Subscription Flow**:
   - Email input → Validation → Duplicate check → Storage → Confirmation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **react-hook-form**: Form state management
- **framer-motion**: Animation library
- **date-fns**: Date utility functions

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **Vite**: Build tool and dev server
- **TypeScript**: Type checking
- **ESBuild**: Production bundling

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` - Starts Vite dev server with TSX compilation
- **Production build**: `npm run build` - Vite builds frontend, ESBuild bundles backend
- **Type checking**: `npm run check` - TypeScript compilation check

### Database Management
- **Schema definition**: Drizzle schema in `shared/schema.ts`
- **Migrations**: Generated in `./migrations` directory
- **Database push**: `npm run db:push` - Apply schema changes

### Environment Configuration
- **Development**: Uses Vite dev server with HMR
- **Production**: Serves static files from Express
- **Database**: Requires `DATABASE_URL` environment variable
- **Replit integration**: Special handling for Replit environment

### File Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared schemas and types
├── migrations/      # Database migrations
├── attached_assets/ # Static content
└── dist/           # Production build output
```

The application uses a monorepo structure with clear separation between frontend, backend, and shared code, making it easy to maintain and deploy.