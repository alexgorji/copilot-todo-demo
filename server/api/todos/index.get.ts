// AI-generated: GitHub Copilot Agent
import prisma from '~~/server/utils/prisma'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const orderParam = query.order
  const order: 'asc' | 'desc' =
    orderParam === 'asc' || orderParam === 'desc' ? orderParam : 'desc'

  const completedParam = query.completed
  const where =
    completedParam === 'true'
      ? { completed: true }
      : completedParam === 'false'
        ? { completed: false }
        : undefined

  return prisma.todo.findMany({
    where,
    orderBy: { createdAt: order }
  })
})
