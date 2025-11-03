import {setupServer} from 'msw/node'
import {handlers} from './handlers/mswDevHandlers'

export const mswTestServer = setupServer(...[...handlers])

export * from 'msw'
