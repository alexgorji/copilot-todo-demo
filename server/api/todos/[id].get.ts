// AI-generated: GitHub Copilot Agent
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }

  const todo = await prisma.todo.findUnique({ where: { id } })

  if (!todo) {
    throw createError({ statusCode: 404, statusMessage: 'Todo not found' })
  }

  return todo
})
