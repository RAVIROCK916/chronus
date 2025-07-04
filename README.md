# Chronus

Chronus is a modern project and task management platform designed to help teams and individuals organize, track, and complete their work efficiently. With a beautiful UI, real-time updates, and powerful analytics, Chronus makes productivity effortless.

---

## Features

- 🗂️ **Projects & Tasks:** Create, edit, and manage projects and tasks with ease.
- 📊 **Dashboards:** Visualize progress with charts, heatmaps, and statistics.
- 🏷️ **Labels & Priorities:** Categorize and prioritize tasks for better organization.
- 📅 **Due Dates:** Set deadlines and never miss important milestones.
- 👥 **Team Collaboration:** Work together with your team on shared projects.
- 🔔 **Notifications:** Stay updated with real-time notifications.
- 🎨 **Customizable UI:** Personalize your workspace with themes and colors.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Redux

### Backend

- Bun
- GraphQL
- Apollo Server

### Database

- PostgreSQL
- Drizzle ORM

---

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/chronus.git
   cd chronus
   ```

2. **Install dependencies:**

   ```sh
   bun install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values.

4. **Run the development server:**

   ```sh
   bun run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Project Structure

```
chronus/
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # Reusable React components
│   ├── db/                 # Database schema and seed scripts
│   ├── lib/                # GraphQL definitions and utilities
│   ├── state/              # Context and state management
│   └── utils/              # Utility functions and constants
├── public/                 # Static assets (fonts, images)
├── .env                    # Environment variables
├── package.json
├── bun.lockb
└── README.md
```

---

## Scripts

- `bun run dev` — Start the development server
- `bun run build` — Build the project for production
- `bun run start` — Start the production server
- `bun run lint` — Lint the codebase

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Drizzle ORM](https://www.drizzle.team/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Tailwind CSS](https://tailwindcss.com/)
