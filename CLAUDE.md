# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Promptify is an AI prompt engineering framework application built to help users discover, test, and utilize 30+ professional AI frameworks (APE, AIDA, BAB, CRAFT, Chain-of-Thought, etc.). Users can test frameworks with personal API keys from OpenAI, Google Gemini, and ZAI providers, all stored securely in the browser.

## Development Commands

### Setup & Dependencies
```bash
npm install              # Install dependencies
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
```

**Environment Variables**: Ensure you have a `.env` file with:
```
DATABASE_URL="file:./db/dev.db"
```

### Development
```bash
npm run dev             # Start dev server with hot reload on port 3000
                        # Uses nodemon + custom server with Socket.IO
                        # Watches server.ts and src directory for changes
```

### Database Operations
```bash
npm run db:migrate      # Create and apply migrations
npm run db:reset        # Reset database (WARNING: deletes data)
npm run db:push         # Push schema changes without migrations
npm run db:generate     # Regenerate Prisma client after schema changes
```

### Production
```bash
npm run build           # Build Next.js for production
npm start              # Start production server (runs tsx server.ts)
```

### Code Quality
```bash
npm run lint           # Run ESLint
```

**Note**: The project has TypeScript and ESLint build errors ignored in `next.config.ts` to allow development to proceed. This is intentional but should be addressed before production deployment.

## Architecture

### Custom Server Setup
This project uses a **custom Node.js server** (`server.ts`) instead of the default Next.js server to integrate Socket.IO for real-time capabilities. The server:
- Runs Next.js through a custom HTTP server
- Integrates Socket.IO at `/api/socketio`
- Handles both Next.js requests and WebSocket connections
- Uses nodemon for hot reload in development

**Important**: Always use `npm run dev` or `npm start` - DO NOT use `next dev` or `next start` directly as they bypass the custom server setup.

### Project Structure

**Data Layer**:
- `src/data/frameworks.ts` - Central data source containing all 30+ AI frameworks with metadata (title, description, category, difficulty, templates, examples)
- Frameworks are organized into macro-categories: Fondamentali, Business, Creativi, Avanzati, Problem Solving
- Each framework includes a template with placeholders like `{input}` for dynamic content

**API Routes** (`src/app/api/`):
- `test-framework/route.ts` - Main API endpoint for testing frameworks with AI providers
  - Applies framework templates to user input
  - Supports OpenAI, Gemini, and ZAI providers
  - Implements retry logic with exponential backoff
  - Automatic fallback to ZAI if primary provider fails
- `test-key/route.ts` - API key validation endpoint
- `health/route.ts` - Health check endpoint

**State Management**:
- Uses **Zustand** with persist middleware for client-side state
- `src/lib/store/api-keys.ts` - Manages API keys storage in browser (localStorage via persist)
- Keys are stored per provider: `gemini`, `openai`, `zai`
- **Security**: API keys never leave the browser except for direct API calls to providers

**Database** (`prisma/`):
- SQLite database (configured in `schema.prisma`)
- Models: `User` and `Post` (basic schema, not heavily used)
- Located in `db/` directory

**Components** (`src/components/`):
- `api-keys-manager.tsx` - Main component for managing API keys
- `category-frameworks.tsx` - Displays frameworks by category
- `macro-category-card.tsx` - Category overview cards
- `search-bar.tsx` - Framework search functionality
- `header.tsx`, `footer.tsx` - Layout components
- `ui/` - shadcn/ui components (accordion, alert, button, card, etc.)

**Pages** (`src/app/`):
- `/` (page.tsx) - Home page with framework explorer
- `/framework/[id]/` - Dynamic route for individual framework pages
- `/impostazioni/` - Settings page for API key management
- `/guida-base/`, `/best-practices/`, `/tecniche-avanzate/` - Documentation pages

### AI Provider Integration

The app supports three AI providers with personal API keys:

1. **OpenAI** (`gpt-4.1-2025-04-14`)
   - Endpoint: `https://api.openai.com/v1/chat/completions`
   - Auth: Bearer token in Authorization header

2. **Google Gemini** (`gemini-2.5-flash`)
   - Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
   - Auth: API key as query parameter

3. **ZAI** (`gpt-4.1-2025-04-14` via z-ai-web-dev-sdk)
   - Endpoint: `https://api.z-ai.dev/v1/chat/completions`
   - SDK: `z-ai-web-dev-sdk` package
   - Used as default fallback when no personal key is provided

**Framework Testing Flow**:
1. User selects framework and enters input on frontend
2. Frontend sends request to `/api/test-framework` with: framework ID, input, optional provider/apiKey
3. API route applies framework template (from `frameworkTemplates` object or custom template)
4. Template replaces `{input}` placeholder with user input
5. Prompt sent to selected AI provider (or ZAI default)
6. Response returned to user with framework-structured output

### Tech Stack Highlights

- **Next.js 15** with App Router (server components)
- **TypeScript 5** for type safety
- **Tailwind CSS 4** with shadcn/ui components
- **Framer Motion** for animations
- **Prisma** ORM with SQLite
- **Socket.IO** for WebSocket support (echo server in `src/lib/socket.ts`)
- **Zustand** for state management
- **React Hook Form** + **Zod** for form validation
- **TanStack Query** for server state
- **next-themes** for dark/light mode

## Important Development Notes

### When Adding New Frameworks
1. Add framework definition to `src/data/frameworks.ts` in the `frameworks` array
2. Add corresponding template to `frameworkTemplates` object in `src/app/api/test-framework/route.ts`
3. Template must include `{input}` placeholder for user input
4. Ensure framework has required fields: id, title, description, icon, color, category, difficulty
5. Update macro-categories if creating new category

### API Key Security
- API keys are stored in browser localStorage only via Zustand persist
- Never commit API keys to the repository
- Keys are sent only to their respective provider endpoints (OpenAI/Gemini/ZAI)
- No server-side storage of user API keys

### Socket.IO Integration
- Socket.IO server is initialized in `server.ts`
- Socket handlers are in `src/lib/socket.ts`
- Currently implements a simple echo server
- Path: `/api/socketio`
- Do not create `/api/socketio` as a Next.js route - it's handled by Socket.IO

### Database Changes
- Always run `npm run db:generate` after modifying `prisma/schema.prisma`
- Use `npm run db:push` for development schema changes
- Use `npm run db:migrate` for production-ready migrations with history

### Internationalization
The app is currently in Italian (as seen in README and UI text). When modifying text:
- Maintain Italian language consistency
- Framework descriptions and examples are in Italian
- Consider adding i18n support if expanding to other languages
