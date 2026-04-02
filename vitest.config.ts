// AI-generated: GitHub Copilot Agent
import { defineVitestConfig } from '@nuxt/test-utils/config'
import { resolve } from 'path'

export default defineVitestConfig({
  resolve: {
    alias: {
      '~~': resolve(__dirname, '.'),
      '~': resolve(__dirname, '.')
    }
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts']
  }
})
