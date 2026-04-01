<!-- AI-generated: GitHub Copilot Agent -->

# Copilot Todo Demo

Minimal full-stack Nuxt scaffold for a Todo app using Prisma, SQLite, Pinia, Tailwind CSS, and Vitest.

## Setup

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

## Commands

```bash
npm run dev
npm run test:run
npm run build
```

## Notes

- Prisma schema comments must use `//`, not `#`.
- The SQLite datasource URL is configured in `prisma.config.ts`.
- Server API handlers should live under `server/api/` and use Nuxt/Nitro patterns.
  \*\*\* Add File: /Users/aligorji/Desktop/tasks/mywonderfulcastle/room_it_job/desk_it_job_training_ai/folder_it_job_training_ai_learn_copilot/copilot-todo-demo/vitest.config.ts
  // AI-generated: GitHub Copilot Agent
  import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
test: {
environment: 'happy-dom'
}
})
