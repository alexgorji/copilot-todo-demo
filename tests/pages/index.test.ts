// AI-generated: GitHub Copilot Agent
// @vitest-environment nuxt
import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import IndexPage from '~/app/pages/index.vue'

const mockTodos = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Write tests', completed: true }
]

describe('pages/index.vue', () => {
  beforeEach(() => {
    registerEndpoint('/api/todos', () => mockTodos)
  })

  it('calls GET /api/todos on page load and renders todo titles', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('Buy milk')
    expect(wrapper.text()).toContain('Write tests')
  })

  it('shows completed status text for each todo', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const items = wrapper.findAll('li')
    expect(items[0].text()).toContain('Pending')
    expect(items[1].text()).toContain('Completed')
  })

  it('applies line-through class to completed todos', async () => {
    const wrapper = await mountSuspended(IndexPage)

    const items = wrapper.findAll('li')
    expect(items[0].classes()).not.toContain('line-through')
    expect(items[1].classes()).toContain('line-through')
  })

  describe('form submit', () => {
    it('adds a new todo without a full page reload', async () => {
      const newTodo = { id: 3, title: 'New todo', completed: false }
      registerEndpoint('/api/todos', { method: 'POST', handler: () => newTodo })

      const wrapper = await mountSuspended(IndexPage)

      await wrapper.find('input[type="text"]').setValue('New todo')
      await wrapper.find('form').trigger('submit')
      await flushPromises()

      expect(wrapper.text()).toContain('New todo')
    })

    it('clears the input after submitting', async () => {
      registerEndpoint('/api/todos', { method: 'POST', handler: () => ({ id: 3, title: 'New todo', completed: false }) })

      const wrapper = await mountSuspended(IndexPage)
      const input = wrapper.find('input[type="text"]')

      await input.setValue('New todo')
      await wrapper.find('form').trigger('submit')
      await flushPromises()

      expect((input.element as HTMLInputElement).value).toBe('')
    })
  })

  describe('delete button', () => {
    it('removes the todo without a full page reload', async () => {
      registerEndpoint('/api/todos/1', { method: 'DELETE', handler: () => ({ success: true }) })

      const wrapper = await mountSuspended(IndexPage)
      expect(wrapper.text()).toContain('Buy milk')

      await wrapper.findAll('button[type="button"]')[0].trigger('click')
      await flushPromises()

      expect(wrapper.text()).not.toContain('Buy milk')
    })
  })
})
