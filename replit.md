# Expense Tracker Application

## Overview

This is a React-based expense tracking application that allows users to manage their daily expenses. The application features a modern fintech-inspired design with the ability to add, categorize, and visualize spending patterns. Built with React, TypeScript, and Tailwind CSS, it provides an intuitive interface for personal finance management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern React features
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** for utility-first styling with custom CSS variables for theming
- **Shadcn/ui** component library for consistent UI components built on Radix UI primitives
- **Lucide React** for consistent iconography throughout the application

### State Management
- **React hooks** (useState, useEffect, useCallback) for local state management
- **React Context API** for authentication state management
- **Custom hooks** (useExpenses, useSupabaseExpenses, useAuth) for business logic abstraction
- **TanStack React Query** for server state management and caching

### Authentication System
- **Supabase Auth** integration with context-based authentication state
- **Protected routes** using HOC pattern
- **User profiles** stored in Supabase with username-based authentication

### Data Storage Solutions
- **Supabase** as the primary backend-as-a-service for user authentication and data persistence
- **PostgreSQL** database through Supabase for storing user profiles and expenses
- **LocalStorage** fallback for offline expense storage when not using Supabase

### Component Architecture
- **Compound component patterns** for complex UI elements (ExpenseForm, ExpenseList, etc.)
- **Prop-based component composition** with TypeScript interfaces
- **Separation of concerns** between presentation and business logic
- **Reusable UI components** following atomic design principles

### Data Flow
- **Unidirectional data flow** from parent to child components
- **Event-driven updates** using callback props
- **Optimistic updates** for better user experience
- **Error boundaries** and loading states throughout the application

### Styling System
- **CSS-in-JS** approach using Tailwind CSS classes
- **Design tokens** implemented through CSS custom properties
- **Responsive design** with mobile-first approach
- **Dark mode support** through CSS variables and class-based theming

## External Dependencies

### Core Dependencies
- **@supabase/supabase-js** - Backend-as-a-service for authentication and database operations
- **@tanstack/react-query** - Server state management and caching
- **recharts** - Data visualization library for expense charts
- **date-fns** - Date manipulation and formatting utilities

### UI Component Libraries
- **@radix-ui/* packages** - Unstyled, accessible UI primitives
- **lucide-react** - Icon library with consistent design
- **class-variance-authority** - Utility for creating variant-based component APIs
- **clsx & tailwind-merge** - Conditional className utilities

### Development Tools
- **TypeScript** - Static type checking and enhanced developer experience
- **ESLint** - Code linting with React and TypeScript rules
- **Vite** - Fast build tool with HMR support
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing

### Form Management
- **react-hook-form** - Performant forms with minimal re-renders
- **@hookform/resolvers** - Schema validation resolvers

### Data Visualization
- **recharts** - Built on D3 for creating responsive charts and graphs
- **embla-carousel-react** - Carousel component for mobile-friendly interfaces

The application is structured to support both local development with localStorage and production deployment with Supabase, providing flexibility in data persistence strategies.