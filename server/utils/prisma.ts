// AI-generated: GitHub Copilot Agent
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' })

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (import.meta.dev) {
  globalForPrisma.prisma = prisma
}

export default prisma
