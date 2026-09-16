# MagentaGrid CMS

Hi! This is my React + TypeScript CMS project developed as part of the MagentaGrid technical assessment.

The application has a public website where users can view published blog posts, along with a protected CMS where authorized users can create, edit, preview, publish, unpublish, and delete posts based on their role.

## Creds

Test accounts
Admin:

Email:disorox307@jobscai.com
Password:disorox307

Editor

Email:bodagib473@meonvr.com

Password:bodagib473

## What I built

### Public side

- Home page
- About page
- Blog page
- Blog details page
- Responsive layout for desktop, tablet, and mobile
- Only published posts are shown publicly

### CMS

The CMS is available to authenticated users.

From the dashboard, users can:

- Create a post
- Edit a post
- Preview a post
- Publish or unpublish a post
- Delete a post
- View created and updated dates

The forms also include required-field validation, loading states, error messages, success feedback, and protection against submitting the same form multiple times.

## User roles

There are two roles in the CMS.

### Admin

An Admin can:

- View posts
- Create posts
- Edit posts
- Preview posts
- Publish posts
- Unpublish posts
- Delete posts

### Editor

An Editor can:

- View posts
- Create posts
- Edit posts
- Preview posts

An Editor cannot publish, unpublish, or delete posts.

These permissions are handled in the UI and are also enforced at the Supabase database level.

## Project Structure

src/
│
├── components/ -> Reusable UI pieces
│ ├── Navbar.tsx -> Top navigation bar
│ ├── PostCard.tsx -> Displays a single blog post
│ └── ProtectedRoute.tsx -> Protects pages that require login
│
├── context/ -> Global application state
│ ├── AuthContext.tsx -> Manages authenticated user and role information
│ └── PostsContext.tsx -> Manages shared post state and Realtime updates
│
├── lib/ -> External services & configuration
│ └── supabase.ts -> Supabase database connection
│
├── pages/ -> Application screens/pages
│ ├── Home.tsx -> Website homepage
│ ├── About.tsx -> About page
│ ├── Blog.tsx -> Shows all blog posts
│ ├── BlogDetails.tsx -> Shows one complete blog post
│ ├── Login.tsx -> User login page
│ ├── Dashboard.tsx -> CMS/admin dashboard
│ ├── CreatePost.tsx -> Create a new post
│ ├── EditPost.tsx -> Edit an existing post
│ ├── PreviewPost.tsx -> Preview a post before publishing
│ └── NotFound.tsx -> 404 page
│
└── test/ -> Testing-related files
├── setup.ts -> Test environment setup
└── vitest.d.ts -> Vitest type definitions

## Realtime Updates

Supabase Realtime is used to keep the CMS and public website updated when changes are made to posts.

When a post is created, edited, published, unpublished, or deleted, the change is detected and the shared post state is refreshed.

The basic flow is:

```text
CMS Action
    |
Supabase Database
    |
Realtime Event
    |
PostsContext
    |
Updated Shared State
    |
Dashboard / Blog / Blog Details
```

## Security & Permissions

Supabase Row Level Security (RLS) is enabled for the `posts` and `profiles` tables.

Admin and Editor permissions are enforced through Supabase database policies.

Admin users can create, edit, publish, unpublish, and delete posts.

Editor users can create and edit posts, but cannot publish, unpublish, or delete posts.

Admin-only actions are also hidden from Editors in the CMS interface.

A database-level trigger prevents Editors from changing the publication status of a post.

## Database

The main `posts` table contains:

| Field         | Description        |
| ------------- | ------------------ |
| `id`          | Unique post ID     |
| `title`       | Post title         |
| `description` | Short description  |
| `content`     | Main post content  |
| `image_url`   | Optional image URL |
| `status`      | Draft or Published |
| `created_at`  | Post creation date |
| `updated_at`  | Last update date   |

The `profiles` table stores the authenticated user's role.

## Validation & UX

The Create Post and Edit Post forms include:

- Required title validation
- Required short description validation
- Required main content validation
- Loading state while saving
- Disabled submit button while saving
- Error messages when an operation fails
- Success feedback after saving
- Existing values are retained when saving fails
- Delete confirmation before deleting a post

The application is responsive across desktop, tablet, and mobile screen sizes.

## Testing

I used Vitest and React Testing Library for basic component testing.

Current tests cover:

- Navbar navigation
- 404 / Not Found page
- PostCard rendering

Run the tests with:

````bash
npm run test


### 6. Tech Stack

```md
## Tech Stack

- React
- TypeScript
- Vite
- React Router
- React Context API
- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Realtime
- Row Level Security
- CSS
- Vitest
- React Testing Library


### 8. AI Usage

Your assessment explicitly allows AI but asks you to mention the tools used, so include this:

```md
## AI Usage

AI tools were used as a development support resource during the project.

I used AI mainly for:

- Understanding React and TypeScript concepts
- Understanding Supabase and Realtime
- Debugging development errors
- Reviewing individual code sections
- CSS and responsive layout suggestions
- Testing setup and troubleshooting
- Documentation assistance

I reviewed and tested the implementation during development and made sure I understood the code used in the project.

## How the application works

I used React Context API to keep the post data shared between the Dashboard, Blog, and Blog Details pages.

Instead of every page fetching the same data separately, the main flow is:

```text
Supabase
   |
PostsContext
   |
Shared post state
   |
Dashboard / Blog / Blog Details
````
