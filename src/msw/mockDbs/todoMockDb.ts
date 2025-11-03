import type {ITodo} from '../../screens/TodoListScreen/types/ITodoApi'

let mockTodos: ITodo[] = [
  {id: 1, task: 'Learn MSW', completed: false},
  {id: 2, task: 'Write tests', completed: true},
  {id: 3, task: 'Integrate with React Query', completed: false},
]

export const todoMockDb = {
  getTodos: (): ITodo[] => {
    return mockTodos
  },
  getTodo: (id: number): ITodo | undefined => {
    return mockTodos.find(t => t.id === id)
  },
  resetTodos: (): void => {
    mockTodos = [
      {id: 1, task: 'Learn MSW', completed: false},
      {id: 2, task: 'Write tests', completed: true},
      {id: 3, task: 'Integrate with React Query', completed: false},
    ]
  },
  addTodo: (todo: ITodo): void => {
    mockTodos = [...mockTodos, todo]
  },
  updateTodo: (id: number, updatedTodo: Partial<ITodo>): ITodo | undefined => {
    let newTodo: ITodo | undefined
    mockTodos = mockTodos.map(t => {
      if (t.id === id) {
        newTodo = {...t, ...updatedTodo}
        return newTodo
      }
      return t
    })
    return newTodo
  },
  deleteTodo: (id: number): boolean => {
    const initialLength = mockTodos.length
    mockTodos = mockTodos.filter(t => t.id !== id)
    return initialLength > mockTodos.length
  },
}
