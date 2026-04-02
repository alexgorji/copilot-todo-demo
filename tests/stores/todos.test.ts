// AI-generated: GitHub Copilot Agent
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodosStore } from '~/stores/todos'

const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

const sampleTodo = { id: 1, title: 'Buy milk', completed: false }

describe('useTodosStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('createTodo', () => {
    it('calls POST /api/todos and appends the new todo to the list', async () => {
      const newTodo = { id: 2, title: 'Write tests', completed: false }
      mockFetch.mockResolvedValueOnce(newTodo)

      const store = useTodosStore()
      store.todos.push(sampleTodo)
      await store.createTodo('Write tests')

      expect(mockFetch).toHaveBeenCalledWith('/api/todos', { method: 'POST', body: { title: 'Write tests' } })
      expect(store.todos).toHaveLength(2)
      expect(store.todos[1]).toEqual(newTodo)
    })
  })

  describe('toggleTodo', () => {
    it('calls PATCH /api/todos/[id]/toggle and updates the todo in-place', async () => {
      const toggled = { ...sampleTodo, completed: true }
      mockFetch.mockResolvedValueOnce(toggled)

      const store = useTodosStore()
      store.todos.push({ ...sampleTodo })
      await store.toggleTodo(1)

      expect(mockFetch).toHaveBeenCalledWith('/api/todos/1/toggle', { method: 'PATCH' })
      expect(store.todos[0].completed).toBe(true)
    })

    it('does not change list length when toggling', async () => {
      mockFetch.mockResolvedValueOnce({ ...sampleTodo, completed: true })

      const store = useTodosStore()
      store.todos.push({ ...sampleTodo })
      await store.toggleTodo(1)

      expect(store.todos).toHaveLength(1)
    })
  })

  describe('deleteTodo', () => {
    it('calls DELETE /api/todos/[id] and removes the todo from the list', async () => {
      mockFetch.mockResolvedValueOnce({ success: true })

      const store = useTodosStore()
      store.todos.push({ ...sampleTodo })
      await store.deleteTodo(1)

      expect(mockFetch).toHaveBeenCalledWith('/api/todos/1', { method: 'DELETE' })
      expect(store.todos).toHaveLength(0)
    })

    it('only removes the todo with the matching id', async () => {
      const todo2 = { id: 2, title: 'Write tests', completed: false }
      mockFetch.mockResolvedValueOnce({ success: true })

      const store = useTodosStore()
      store.todos.push({ ...sampleTodo }, { ...todo2 })
      await store.deleteTodo(1)

      expect(store.todos).toHaveLength(1)
      expect(store.todos[0]).toEqual(todo2)
    })
  })
})
