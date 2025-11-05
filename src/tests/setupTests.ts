import {cleanup} from '@testing-library/react'
import * as ResizeObserverModule from 'resize-observer-polyfill'

import '@testing-library/dom'
import '@testing-library/jest-dom/vitest'
import {mswTestServer} from '../msw/mswTestServer'

beforeAll(() => {
  window.ResizeObserver = ResizeObserverModule.default
  HTMLElement.prototype.scrollIntoView = vi.fn()
  mswTestServer.listen()
})

afterEach(() => {
  mswTestServer.resetHandlers()
  cleanup()
})

afterAll(() => {
  mswTestServer.close()
})
