// AI-generated: GitHub Copilot Agent
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  return prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
})
