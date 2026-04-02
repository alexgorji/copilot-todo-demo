// AI-generated: GitHub Copilot Agent
import prisma from '~~/server/utils/prisma'
import { defineEventHandler } from 'h3'
export default defineEventHandler(async () => {
  return prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
})
