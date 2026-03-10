# 📝 NoteHub

A modern **Notes CRUD application** built with **Next.js App Router**,
**React Query**, and **Zustand**.

This project demonstrates modern frontend architecture including: -
server and client components - API caching with React Query - client
state management with Zustand - modal routing - search and pagination

------------------------------------------------------------------------

## 🚀 Features

-   Create notes
-   Edit notes
-   Delete notes
-   Search notes by title
-   Pagination for notes list
-   Modal-based create/edit pages
-   Data caching with React Query
-   Local state management with Zustand
-   Loading states for async operations

------------------------------------------------------------------------

## 🧠 Tech Stack

### Framework

-   Next.js
-   React
-   TypeScript

### State & Data

-   TanStack Query (React Query)
-   Zustand

### Networking

-   Axios

### UI

-   CSS Modules
-   React Paginate
-   React Spinners

------------------------------------------------------------------------

## 📁 Project Structure

    src
     ├── app
     │   ├── create-note
     │   ├── edit-note/[id]
     │   ├── notes
     │   │   └── @modal
     │   ├── loading.tsx
     │   └── layout.tsx
     │
     ├── components
     │   ├── Header
     │   ├── NoteForm
     │   ├── NoteList
     │   ├── SearchNotes
     │   ├── DeleteNote
     │   ├── Modal
     │   └── TanStackProvider
     │
     ├── lib/api
     │   └── noteApi.ts
     │
     ├── stores
     │   ├── noteStore.ts
     │   ├── paginationStore.ts
     │   └── searchStore.ts
     │
     └── types
         └── note.ts

------------------------------------------------------------------------

## 🔄 Data Flow

Server state:

UI → React Query → API (Axios)

Client state:

UI → Zustand Store → Component updates

------------------------------------------------------------------------

## ⚙️ Getting Started

Install dependencies:

``` bash
npm install
```

Run development server:

``` bash
npm run dev
```

Open in browser:

    http://localhost:3000

------------------------------------------------------------------------

## 👨‍💻 Author

**Hennadii Moholivets**\
Frontend Developer (React / Next.js / TypeScript)

GitHub:\
https://github.com/wordisstuff
