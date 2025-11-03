import {setupWorker} from 'msw/browser'
import {handlers} from './handlers/mswDevHandlers'

export const mswDevServer = setupWorker(...handlers)
