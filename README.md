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
- With Prisma 7, keep the SQLite datasource URL in `prisma.config.ts` for CLI commands and pass a SQLite driver adapter to `PrismaClient` at runtime.
- Server API handlers should live under `server/api/` and use Nuxt/Nitro patterns.
