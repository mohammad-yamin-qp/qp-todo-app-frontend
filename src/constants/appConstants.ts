export const IS_TEST_ENV = import.meta.env.MODE === 'test'
export const IS_DEV_ENV = import.meta.env.MODE === 'development'
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/'
export const IS_MOCK_ENV = import.meta.env.MODE === 'mock'
export const APP_NAME = 'QPTodo'
