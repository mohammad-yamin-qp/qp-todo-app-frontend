import {afterAll, afterEach, beforeAll, beforeEach, vi} from 'vitest'
import * as ResizeObserverModule from 'resize-observer-polyfill'
import {cleanup} from '@testing-library/react'

import '@testing-library/dom'
import {mswTestServer} from '../msw/mswTestServer'
import '@testing-library/jest-dom'

beforeAll(() => {
  window.ResizeObserver = ResizeObserverModule.default
  HTMLElement.prototype.scrollIntoView = vi.fn()
  mswTestServer.listen()
})

beforeEach(() => {})

afterEach(() => {
  mswTestServer.resetHandlers()
  cleanup()
})

afterAll(() => {
  mswTestServer.close()
})
