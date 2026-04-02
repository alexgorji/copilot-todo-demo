// AI-generated: GitHub Copilot Agent
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createEvent } from 'h3'

// Mock the Prisma singleton before importing any handlers
vi.mock('~/server/utils/prisma', () => {
  const todo = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
  return { default: { todo } }
})

// Helper to create an H3 event from a plain Request
function makeEvent(url: string, init?: RequestInit, params?: Record<string, string>) {
  const event = createEvent(new Request(url, init))
  if (params) {
    event.context.params = params
  }
  return event
}

// Helper to create a JSON POST/PUT/PATCH event
function jsonEvent(url: string, method: string, body: unknown, params?: Record<string, string>) {
  return makeEvent(
    url,
    {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    },
    params
  )
}

const now = new Date()

const sampleTodo = { id: 1, title: 'Buy milk', completed: false, createdAt: now, updatedAt: now }

// ──────────────────────────────────────────────────────────────────────────
// Import handlers lazily so the vi.mock above is hoisted and applied first
// ──────────────────────────────────────────────────────────────────────────

describe('GET /api/todos', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns all todos ordered by createdAt desc by default', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const todos = [sampleTodo]
    vi.mocked(prisma.todo.findMany).mockResolvedValue(todos as never)

    const { default: handler } = await import('~/server/api/todos/index.get')
    const event = makeEvent('http://localhost/api/todos')
    const result = await handler(event)

    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where: undefined, orderBy: { createdAt: 'desc' } })
    expect(result).toEqual(todos)
  })

  it('filters by completed=true', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const todos = [{ ...sampleTodo, completed: true }]
    vi.mocked(prisma.todo.findMany).mockResolvedValue(todos as never)

    const { default: handler } = await import('~/server/api/todos/index.get')
    const event = makeEvent('http://localhost/api/todos?completed=true')
    const result = await handler(event)

    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where: { completed: true }, orderBy: { createdAt: 'desc' } })
    expect(result).toEqual(todos)
  })

  it('filters by completed=false', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const todos = [sampleTodo]
    vi.mocked(prisma.todo.findMany).mockResolvedValue(todos as never)

    const { default: handler } = await import('~/server/api/todos/index.get')
    const event = makeEvent('http://localhost/api/todos?completed=false')
    const result = await handler(event)

    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where: { completed: false }, orderBy: { createdAt: 'desc' } })
    expect(result).toEqual(todos)
  })

  it('orders by createdAt asc when order=asc', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const todos = [sampleTodo]
    vi.mocked(prisma.todo.findMany).mockResolvedValue(todos as never)

    const { default: handler } = await import('~/server/api/todos/index.get')
    const event = makeEvent('http://localhost/api/todos?order=asc')
    const result = await handler(event)

    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where: undefined, orderBy: { createdAt: 'asc' } })
    expect(result).toEqual(todos)
  })

  it('orders by createdAt desc when order=desc', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const todos = [sampleTodo]
    vi.mocked(prisma.todo.findMany).mockResolvedValue(todos as never)

    const { default: handler } = await import('~/server/api/todos/index.get')
    const event = makeEvent('http://localhost/api/todos?order=desc')
    const result = await handler(event)

    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where: undefined, orderBy: { createdAt: 'desc' } })
    expect(result).toEqual(todos)
  })

  it('ignores invalid order value and defaults to desc', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const todos = [sampleTodo]
    vi.mocked(prisma.todo.findMany).mockResolvedValue(todos as never)

    const { default: handler } = await import('~/server/api/todos/index.get')
    const event = makeEvent('http://localhost/api/todos?order=invalid')
    const result = await handler(event)

    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where: undefined, orderBy: { createdAt: 'desc' } })
    expect(result).toEqual(todos)
  })

  it('ignores invalid completed value and returns all todos', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const todos = [sampleTodo]
    vi.mocked(prisma.todo.findMany).mockResolvedValue(todos as never)

    const { default: handler } = await import('~/server/api/todos/index.get')
    const event = makeEvent('http://localhost/api/todos?completed=maybe')
    const result = await handler(event)

    expect(prisma.todo.findMany).toHaveBeenCalledWith({ where: undefined, orderBy: { createdAt: 'desc' } })
    expect(result).toEqual(todos)
  })
})

describe('POST /api/todos', () => {
  beforeEach(() => vi.clearAllMocks())

  it('creates and returns a new todo', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    vi.mocked(prisma.todo.create).mockResolvedValue(sampleTodo as never)

    const { default: handler } = await import('~/server/api/todos/index.post')
    const event = jsonEvent('http://localhost/api/todos', 'POST', { title: 'Buy milk' })
    const result = await handler(event)

    expect(prisma.todo.create).toHaveBeenCalledWith({ data: { title: 'Buy milk' } })
    expect(result).toEqual(sampleTodo)
  })

  it('returns 400 when title is missing', async () => {
    const { default: handler } = await import('~/server/api/todos/index.post')
    const event = jsonEvent('http://localhost/api/todos', 'POST', {})
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 400 })
  })

  it('returns 400 when title is an empty string', async () => {
    const { default: handler } = await import('~/server/api/todos/index.post')
    const event = jsonEvent('http://localhost/api/todos', 'POST', { title: '   ' })
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 400 })
  })

  it('returns 400 when title is not a string', async () => {
    const { default: handler } = await import('~/server/api/todos/index.post')
    const event = jsonEvent('http://localhost/api/todos', 'POST', { title: 123 })
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 400 })
  })
})

describe('GET /api/todos/[id]', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns the todo when found', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    vi.mocked(prisma.todo.findUnique).mockResolvedValue(sampleTodo as never)

    const { default: handler } = await import('~/server/api/todos/[id].get')
    const event = makeEvent('http://localhost/api/todos/1', {}, { id: '1' })
    const result = await handler(event)

    expect(prisma.todo.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
    expect(result).toEqual(sampleTodo)
  })

  it('returns 404 when todo is not found', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    vi.mocked(prisma.todo.findUnique).mockResolvedValue(null as never)

    const { default: handler } = await import('~/server/api/todos/[id].get')
    const event = makeEvent('http://localhost/api/todos/99', {}, { id: '99' })
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('PUT /api/todos/[id]', () => {
  beforeEach(() => vi.clearAllMocks())

  it('updates and returns the todo', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const updated = { ...sampleTodo, title: 'Buy oat milk', completed: true }
    vi.mocked(prisma.todo.update).mockResolvedValue(updated as never)

    const { default: handler } = await import('~/server/api/todos/[id].put')
    const event = jsonEvent('http://localhost/api/todos/1', 'PUT', { title: 'Buy oat milk', completed: true }, { id: '1' })
    const result = await handler(event)

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'Buy oat milk', completed: true }
    })
    expect(result).toEqual(updated)
  })
})

describe('DELETE /api/todos/[id]', () => {
  beforeEach(() => vi.clearAllMocks())

  it('deletes the todo and returns success', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    vi.mocked(prisma.todo.delete).mockResolvedValue(sampleTodo as never)

    const { default: handler } = await import('~/server/api/todos/[id].delete')
    const event = makeEvent('http://localhost/api/todos/1', { method: 'DELETE' }, { id: '1' })
    const result = await handler(event)

    expect(prisma.todo.delete).toHaveBeenCalledWith({ where: { id: 1 } })
    expect(result).toEqual({ success: true })
  })
})

describe('PATCH /api/todos/[id]/toggle', () => {
  beforeEach(() => vi.clearAllMocks())

  it('flips completed from false to true', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    const toggled = { ...sampleTodo, completed: true }
    vi.mocked(prisma.todo.findUnique).mockResolvedValue(sampleTodo as never)
    vi.mocked(prisma.todo.update).mockResolvedValue(toggled as never)

    const { default: handler } = await import('~/server/api/todos/[id]/toggle.patch')
    const event = makeEvent('http://localhost/api/todos/1/toggle', { method: 'PATCH' }, { id: '1' })
    const result = await handler(event)

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { completed: true }
    })
    expect(result).toEqual(toggled)
  })

  it('returns 404 when todo is not found', async () => {
    const { default: prisma } = await import('~/server/utils/prisma')
    vi.mocked(prisma.todo.findUnique).mockResolvedValue(null as never)

    const { default: handler } = await import('~/server/api/todos/[id]/toggle.patch')
    const event = makeEvent('http://localhost/api/todos/99/toggle', { method: 'PATCH' }, { id: '99' })
    await expect(handler(event)).rejects.toMatchObject({ statusCode: 404 })
  })
})
