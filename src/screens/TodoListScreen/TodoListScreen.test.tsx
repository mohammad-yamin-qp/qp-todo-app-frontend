import {API_BASE_URL} from '@/constants/appConstants'
import {todoMockDb} from '@/msw/mockDbs/todoMockDb'
import {http, HttpResponse, mswTestServer} from '@/msw/mswTestServer'
import {AppProviders} from '@/providers/AppProviders'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent, {type UserEvent} from '@testing-library/user-event'
import {TodoListScreen} from './TodoListScreen'
import {TODO_TYPE} from './constants/todoTypeConstants'

describe('TodoListScrenn', () => {
  afterEach(() => {
    todoMockDb.resetTodos()
  })

  const renderComponent = (): {user: UserEvent} => {
    render(<TodoListScreen />, {wrapper: AppProviders})

    const user = userEvent.setup()
    return {
      user,
    }
  }

  it('should render heading todo list', () => {
    renderComponent()
    const heading = screen.getByText(/todo list/i)
    expect(heading).toBeInTheDocument()
  })

  it('should show all todos', () => {
    renderComponent()

    todoMockDb.getTodos().forEach(async todo => {
      expect(await screen.findByText(todo.task)).toBeInTheDocument()
    })
  })

  it('should show line through when a todo is completed', async () => {
    const {user} = renderComponent()

    const todoText = 'Learn MSW'
    const todo = await screen.findByText(todoText)
    const checkbox = todo.parentElement?.querySelector(
      'button[role="checkbox"]',
    )

    expect(checkbox).not.toBeNull()

    await user.click(checkbox!)

    expect(await screen.findByText(todoText)).toHaveClass('line-through')
  })

  it('should add a new todo to the list', async () => {
    const {user} = renderComponent()

    const addTodoButton = screen.getByText(/add new/i)
    await user.click(addTodoButton)

    const taskInput =
      await screen.findByPlaceholderText(/what's on your mind?/i)
    const addButton = screen.getByRole('button', {name: /save/i})

    const newTodoText = 'New Todo'
    await user.type(taskInput, newTodoText)
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText(newTodoText)).toBeInTheDocument()
    })
  })

  it('should edit a todo', async () => {
    const {user} = renderComponent()

    const todoText = 'Learn MSW'
    const todoItem = await screen.findByText(todoText)

    const editButton =
      todoItem?.parentElement?.nextElementSibling?.querySelector(
        'button[aria-label="edit"]',
      )

    expect(editButton).not.toBeNull()

    await user.click(editButton!)

    const input =
      editButton?.parentElement?.parentElement?.querySelector('input')
    expect(input).not.toBeNull()

    const updatedTodoText = 'Updated Todo'
    await user.clear(input!)
    await user.type(input!, updatedTodoText)
    await user.keyboard('{enter}')

    await waitFor(() => {
      expect(screen.getByText(updatedTodoText)).toBeInTheDocument()
    })
  })

  it('should delete a todo', async () => {
    const {user} = renderComponent()

    const todoText = 'Learn MSW'
    const todoItem = await screen.findByText(todoText)
    const deleteButton =
      todoItem?.parentElement?.nextElementSibling?.querySelector(
        'button[aria-label="delete"]',
      )

    expect(deleteButton).not.toBeNull()

    await user.click(deleteButton!)

    const deleteConfirmationButton = screen.getByRole('button', {
      name: /delete/i,
    })
    await user.click(deleteConfirmationButton)

    await waitFor(() => {
      expect(screen.queryByText(todoText)).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByRole('presentation')).toBeInTheDocument()
    })
  })

  it('should filter the completed todo list', async () => {
    const {user} = renderComponent()

    const filter = screen.getByLabelText('Select Todo Type')
    await user.click(filter)

    const completedOption = screen.getByRole('menuitem', {
      name: TODO_TYPE[1].label,
    })
    await user.click(completedOption)

    const completedTodos = todoMockDb
      .getTodos()
      .filter(todo => todo.completed === true)

    completedTodos.forEach(todo => {
      expect(screen.getByText(todo.task)).toBeInTheDocument()
    })
  })

  it('should filter the uncompleted todo list', async () => {
    const {user} = renderComponent()

    const filter = screen.getByLabelText('Select Todo Type')
    await user.click(filter)

    const uncompletedOption = screen.getByRole('menuitem', {
      name: TODO_TYPE[2].label,
    })
    await user.click(uncompletedOption)

    const uncompletedTodos = todoMockDb
      .getTodos()
      .filter(todo => todo.completed === false)

    uncompletedTodos.forEach(todo => {
      expect(screen.getByText(todo.task)).toBeInTheDocument()
    })
  })

  it('should filter the all todo list', async () => {
    const {user} = renderComponent()

    const filter = screen.getByLabelText('Select Todo Type')
    await user.click(filter)

    const allOption = screen.getByRole('menuitem', {name: /All/i})
    await user.click(allOption)

    const allTodos = todoMockDb.getTodos()

    allTodos.forEach(todo => {
      expect(screen.getByText(todo.task)).toBeInTheDocument()
    })
  })

  it('should search the todo list', async () => {
    const {user} = renderComponent()

    const allTodos = todoMockDb.getTodos()

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, allTodos[0].task.slice(0, 3))

    expect(await screen.findByText(allTodos[0].task)).toBeInTheDocument()
  })

  it('should show error message if it is failed to fetch todos from api', async () => {
    mswTestServer.use(
      http.get(`${API_BASE_URL}api/todos`, () => {
        return HttpResponse.error()
      }),
    )

    renderComponent()

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
  })
})
