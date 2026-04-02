// AI-generated: GitHub Copilot Agent
import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (
    !body?.title ||
    typeof body.title !== 'string' ||
    body.title.trim() === ''
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'title is required and must be a non-empty string'
    })
  }

  return prisma.todo.create({
    data: { title: body.title.trim() }
  })
})
