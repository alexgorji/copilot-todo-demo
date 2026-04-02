// AI-generated: GitHub Copilot Agent
// @vitest-environment nuxt
import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

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
})
