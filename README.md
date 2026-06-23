# RecipeBook

A full-stack cooking recipe web application built with **Next.js 16**, featuring user authentication, a favorites system, dark/light mode, and automated welcome emails on registration.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Data Flow](#data-flow)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)

---

## Features

- Browse a catalog of recipes without logging in
- View full recipe detail: ingredients, step-by-step instructions, prep time, servings
- User registration and login with JWT sessions
- Save and unsave recipes as favorites (requires authentication)
- Personal favorites page showing only saved recipes
- Navbar displays the logged-in user's name
- Light / Dark mode toggle with OS preference detection and localStorage persistence
- Welcome email sent automatically on registration
- Fully responsive layout (mobile-first)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | HeroUI v3 |
| Authentication | NextAuth.js v4 (JWT strategy, Credentials provider) |
| Database | MongoDB + Mongoose |
| HTTP Client | Axios |
| Email | Nodemailer |
| Fonts | Barlow Condensed, Nunito (Google Fonts) |

---

## Project Architecture

The project follows a **layered architecture** with a strict separation of concerns across four layers:

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT (Browser)                    │
│                                                      │
│  Pages / Components                                  │
│       ↓  use                                         │
│  src/hooks/          React state management          │
│       ↓  call                                        │
│  src/services/       HTTP calls via Axios            │
└──────────────────────┬──────────────────────────────┘
                       │  HTTP Request
┌──────────────────────▼──────────────────────────────┐
│                  SERVER (Node.js)                    │
│                                                      │
│  src/app/api/        Route handlers (HTTP layer)     │
│       ↓  delegate to                                 │
│  src/lib/services/   Business logic + DB queries     │
│       ↓  query                                       │
│  MongoDB             (via Mongoose models)           │
└─────────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| **UI** | `src/app/**/page.tsx`, `src/components/` | Render, user interaction |
| **Hooks** | `src/hooks/` | React state: loading, error, data |
| **Client Services** | `src/services/` | Axios HTTP calls to the API |
| **API Routes** | `src/app/api/` | Receive requests, validate auth, return responses |
| **Server Services** | `src/lib/services/` | All database logic (Mongoose queries) |
| **Models** | `src/app/models/` | Mongoose schemas and document types |
| **Context** | `src/context/` | Global React state (theme) |

---

## Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   └── register/page.tsx       # Register page
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/      # NextAuth handler
│   │   │   └── register/route.ts   # POST /api/auth/register
│   │   ├── recipes/
│   │   │   ├── route.ts            # GET /api/recipes
│   │   │   └── [id]/route.ts       # GET /api/recipes/:id
│   │   └── favorites/
│   │       └── route.ts            # GET / POST / DELETE /api/favorites
│   ├── favorites/page.tsx          # Saved recipes page (auth required)
│   ├── recipes/[id]/page.tsx       # Recipe detail page
│   ├── lib/
│   │   ├── auth.ts                 # NextAuth configuration
│   │   ├── mailer.ts               # Nodemailer transporter + welcome email
│   │   ├── mongodb.ts              # MongoDB connection singleton
│   │   └── mockData.ts             # Seed data
│   ├── models/
│   │   ├── Recipe.ts               # Recipe Mongoose schema
│   │   ├── User.ts                 # User Mongoose schema
│   │   └── Favorite.ts             # Favorite Mongoose schema
│   ├── types/index.ts              # All TypeScript interfaces and DTOs
│   ├── globals.css                 # Global styles + Tailwind + HeroUI
│   ├── layout.tsx                  # Root layout (providers, anti-FOUC script)
│   └── page.tsx                    # Home page — recipe catalog
│
├── components/
│   ├── Navbar.tsx                  # Top navigation with auth state + theme toggle
│   ├── RecipeCard.tsx              # Reusable recipe card component
│   └── SessionProvider.tsx         # NextAuth session wrapper
│
├── context/
│   └── ThemeContext.tsx            # Theme context: isDark state + toggleTheme
│
├── hooks/
│   ├── useRecipes.ts               # Fetch all recipes
│   ├── useRecipe.ts                # Fetch single recipe by id
│   ├── useFavorites.ts             # Fetch + toggle favorites (ids only)
│   ├── useFavoriteRecipes.ts       # Fetch favorites with full recipe data
│   ├── useLogin.ts                 # Login form state + submit handler
│   └── useRegister.ts              # Register form state + submit handler
│
├── lib/
│   └── services/                   # SERVER-SIDE service layer
│       ├── recipeService.ts        # getAllRecipes(), getRecipeById()
│       ├── favoriteService.ts      # getFavoritesByUser(), addFavorite(), removeFavorite()
│       └── userService.ts          # createUser() + sendWelcomeEmail()
│
└── services/                       # CLIENT-SIDE service layer
    ├── recipeService.ts            # axios calls for recipes
    ├── favoriteService.ts          # axios calls for favorites
    └── authService.ts              # axios calls for register + logout
```

---

## Data Flow

### Viewing the recipe catalog

```
1. app/page.tsx
      renders and calls → useRecipes()

2. src/hooks/useRecipes.ts
      calls → recipeService.getAll()

3. src/services/recipeService.ts
      axios.get('/api/recipes')
      ──── HTTP GET /api/recipes ────▶

4. src/app/api/recipes/route.ts
      calls → getAllRecipes()

5. src/lib/services/recipeService.ts
      connectDB()
      Recipe.find({}).select(...).lean()
      ──── MongoDB query ────▶ returns documents

6. Response flows back up through each layer
   MongoDB → lib/service → api/route → axios → hook → component
```

### Toggling a favorite

```
1. RecipeCard.tsx — user clicks the bookmark icon
2. useFavorites.ts — calls favoriteService.toggle(recipeId)
3. src/services/favoriteService.ts — POST or DELETE /api/favorites
4. src/app/api/favorites/route.ts — validates JWT session
5. src/lib/services/favoriteService.ts — addFavorite() or removeFavorite()
6. MongoDB — upsert or delete in the favorites collection
```

### Registering a new user

```
1. register/page.tsx — form submit
2. useRegister.ts — calls authService.register(data)
3. src/services/authService.ts — POST /api/auth/register
4. src/app/api/auth/register/route.ts — validates input fields
5. src/lib/services/userService.ts
      - connectDB()
      - checks email uniqueness
      - bcrypt.hash(password, 10)
      - User.create(...)
      - sendWelcomeEmail() ← fires async, non-blocking
```

---

## Database Schema

### `users`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `name` | String | Required |
| `email` | String | Unique, lowercase |
| `password` | String | bcrypt hashed, min 6 chars |
| `createdAt` | Date | Auto (timestamps) |
| `updatedAt` | Date | Auto (timestamps) |

### `recipes`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `title` | String | Required |
| `image` | String | URL |
| `prepTime` | Number | Minutes, min 1 |
| `difficulty` | String | `"easy"` \| `"medium"` \| `"hard"` |
| `description` | String | Required |
| `servings` | Number | Min 1 |
| `ingredients` | Array | `{ name, amount, unit? }[]` — min 1 item |
| `steps` | Array | `{ stepNumber, description }[]` — min 1 item |
| `createdAt` | Date | Auto (timestamps) |

### `favorites`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `userId` | ObjectId | Ref → `users` |
| `recipeId` | ObjectId | Ref → `recipes` |
| `createdAt` | Date | Auto |

> Compound unique index on `{ userId, recipeId }` prevents duplicate favorites.

---

## API Reference

All endpoints return `{ success: true, data: ... }` on success or `{ error: "..." }` on failure.

### Recipes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/recipes` | No | Returns all recipes (summary fields only) |
| `GET` | `/api/recipes/:id` | No | Returns a single recipe with full detail |

### Favorites

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/favorites` | Yes | Returns the authenticated user's saved recipes |
| `POST` | `/api/favorites` | Yes | Body: `{ recipeId }` — adds to favorites |
| `DELETE` | `/api/favorites` | Yes | Body: `{ recipeId }` — removes from favorites |

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Body: `{ name, email, password }` — creates account + sends welcome email |
| `POST` | `/api/auth/signin` | No | Handled by NextAuth (credentials provider) |
| `POST` | `/api/auth/signout` | Yes | Handled by NextAuth |

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# NextAuth
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Email (Nodemailer)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your@email.com
MAIL_PASS=your_email_password
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB instance)
- An SMTP email account for sending welcome emails

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seed the database

```bash
npm run seed
```

Populates the `recipes` collection with sample data from `src/app/lib/mockData.ts`.

### Build for production

```bash
npm run build
npm start
```

---

## Pages

| Route | Description | Auth Required |
|---|---|---|
| `/` | Recipe catalog — browse all recipes | No |
| `/recipes/[id]` | Full recipe detail with ingredients and steps | No |
| `/login` | Sign in with email and password | No |
| `/register` | Create a new account | No |
| `/favorites` | Personal collection of saved recipes | Yes |
