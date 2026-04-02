// AI-generated: GitHub Copilot Agent
import prisma from '~~/server/utils/prisma'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }

  const body = await readBody(event)
  const data: { title?: string; completed?: boolean } = {}

  if (body?.title !== undefined) {
    if (typeof body.title !== 'string' || body.title.trim() === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'title must be a non-empty string'
      })
    }
    data.title = body.title.trim()
  }

  if (body?.completed !== undefined) {
    if (typeof body.completed !== 'boolean') {
      throw createError({
        statusCode: 400,
        statusMessage: 'completed must be a boolean'
      })
    }
    data.completed = body.completed
  }

  try {
    return await prisma.todo.update({ where: { id }, data })
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
