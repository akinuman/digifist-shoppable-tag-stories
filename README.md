# Digifist Shoppable Tag Stories

This project is a Next.js application integrated with Sanity CMS, featuring shoppable tag stories.

## Getting Started

Follow these steps to get the project running locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd digifist-shoppable-tag-stories
```

### 2. Install Dependencies

We use `bun` for dependency management.

```bash
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory.

**Important:** Do NOT commit your `.env.local` file to version control.

Add the following variables to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-31
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_ENV=development
SANITY_API_READ_TOKEN=your_sanity_read_token
```

### 4. Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sanity Studio (CMS)

To manage content, you can access the Sanity Studio.

1.  Navigate to [http://localhost:3000/studio](http://localhost:3000/studio).
2.  Login with your **Email** (or whichever provider is configured for the project).
3.  Once logged in, you can add/edit products, posts, and tags.

> **Note:** Any changes made in the Studio will reflect in the application in real-time.
