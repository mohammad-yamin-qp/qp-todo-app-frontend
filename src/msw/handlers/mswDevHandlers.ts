import {HttpResponse, http} from 'msw'
import {API_BASE_URL} from '../../constants/appConstants'
import type {ITodo} from '../../screens/TodoListScreen/types/ITodoApi'
import {todoMockDb} from '../mockDbs/todoMockDb'

// const sendResponse = <T>(res: T): HttpResponse<{data: T}> => {
//   return HttpResponse.json({data: res})
// }

// export const mswDevHandlers = [
//   http.get(`${API_BASE_URL}user`, () => {
//     const user = userMockDb.getUser()
//     return sendResponse<IUser>(user)
//   }),
// ]

// Helper for a new ID
const getNextId = (): number => {
  const todos = todoMockDb.getTodos()
  if (todos.length === 0) return 1
  // Use 0 for undefined ids so Math.max receives only numbers
  return Math.max(...todos.map(t => t.id ?? 0)) + 1
}

export const handlers = [
  /**
   * GET /api/todos
   * Mocks the `getTodos` function
   */
  http.get(`${API_BASE_URL}api/todos`, ({request}) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')
    const type = url.searchParams.get('type')

    let mockTodos = todoMockDb.getTodos()

    if (query) {
      mockTodos = mockTodos.filter(todo =>
        todo.task.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (type) {
      mockTodos = mockTodos.filter(todo => {
        if (type === 'completed') {
          return todo.completed === true
        } else if (type === 'pending') {
          return todo.completed === false
        }
        return true
      })
    }

    return HttpResponse.json(mockTodos)
  }),

  /**
   * POST /api/todos
   * Mocks the `createTodo` function
   */
  http.post(`${API_BASE_URL}api/todos`, async ({request}) => {
    // Read the request body
    const newTodoData = (await request.json()) as Omit<ITodo, 'id'>

    if (!newTodoData.task) {
      return HttpResponse.json({message: 'Title is required'}, {status: 400})
    }

    const newTodo: ITodo = {
      id: getNextId(),
      task: newTodoData.task,
      completed: newTodoData.completed || false,
    }

    todoMockDb.addTodo(newTodo)
    return HttpResponse.json(newTodo, {status: 201})
  }),

  /**
   * PUT /api/todos/:id
   * Mocks the `updateTodo` function
   */
  http.put(`${API_BASE_URL}api/todos/:id`, async ({request, params}) => {
    const {id} = params
    const updatedData = (await request.json()) as Partial<ITodo>

    const updatedTodo = todoMockDb.updateTodo(Number(id), updatedData)

    if (!updatedTodo) {
      return HttpResponse.json({message: 'Todo not found'}, {status: 404})
    }
    return HttpResponse.json(updatedTodo)
  }),

  /**
   * DELETE /api/todos/:id
   * Mocks the `deleteTodo` function
   */
  http.delete(`${API_BASE_URL}api/todos/:id`, ({params}) => {
    const {id} = params
    const isDeleted = todoMockDb.deleteTodo(Number(id))

    if (!isDeleted) {
      return HttpResponse.json({message: 'Todo not found'}, {status: 404})
    }

    return new HttpResponse(null, {status: 204})
  }),
]
