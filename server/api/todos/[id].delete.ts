// AI-generated: GitHub Copilot Agent
import prisma from '~~/server/utils/prisma'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }

  try {
    await prisma.todo.delete({ where: { id } })
    return { success: true }
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw createError({ statusCode: 404, statusMessage: 'Todo not found' })
    }
    throw err
  }
})
