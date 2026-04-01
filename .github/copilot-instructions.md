<!-- AI-generated: GitHub Copilot Agent -->

# Copilot Instructions

- Use `//` comments in `prisma/schema.prisma`; Prisma 7 rejects `#` comments.
- Keep the SQLite datasource URL out of `prisma/schema.prisma`; set it in `prisma.config.ts` as `file:./prisma/dev.db`.
- Reuse the Prisma singleton from `server/utils/prisma.ts` with `globalThis as unknown as { prisma: PrismaClient }` and `import.meta.dev`.
- Do not use `process.env` or `typeof global` in the Prisma singleton.
- Keep `prisma/dev.db` and `prisma/dev.db-journal` ignored by git.
- Nitro server handlers belong under `server/api/` and should use Nuxt/Nitro patterns, not Express middleware patterns.
- Run project commands from inside the `copilot-todo-demo/` directory.
- Keep scaffold-only work limited to configuration and placeholders until implementation is requested.
- During scaffold-only work, do not create API handlers, routes, pages, components, composables, migrations, or Pinia stores.
- If `npx prisma generate` or `npm run build` fails during scaffolding, fix only scaffold/configuration issues needed to make them pass.
- Add `AI-generated: GitHub Copilot Agent` to the top of every new file using the correct comment syntax for that file type.<!-- AI-generated: GitHub Copilot Agent -->

# Copilot Instructions

- Use `//` comments in `prisma/schema.prisma`; Prisma 7 rejects `#` comments.
- Keep the SQLite datasource URL out of `prisma/schema.prisma`; set it in `prisma.config.ts` as `file:./prisma/dev.db`.
- Reuse the Prisma singleton from `server/utils/prisma.ts` with `globalThis as unknown as { prisma: PrismaClient }` and `import.meta.dev`.
- Do not use `process.env` or `typeof global` in the Prisma singleton.
- Keep `prisma/dev.db` and `prisma/dev.db-journal` ignored by git.
- Nitro server handlers belong under `server/api/` and should use Nuxt/Nitro patterns, not Express middleware patterns.
- Run project commands from inside the `copilot-todo-demo/` directory.
- Keep scaffold-only work limited to configuration and placeholders until implementation is requested.
- During scaffold-only work, do not create API handlers, routes, pages, components, composables, migrations, or Pinia stores.
- If `npx prisma generate` or `npm run build` fails during scaffolding, fix only scaffold/configuration issues needed to make them pass.
- Add `AI-generated: GitHub Copilot Agent` to the top of every new file using the correct comment syntax for that file type.
- If an issue body or PR description already includes an AI-transparency disclaimer, preserve it unless the user explicitly asks to remove or change it.
