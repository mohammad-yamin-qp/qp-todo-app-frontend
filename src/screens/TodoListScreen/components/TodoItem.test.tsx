import {todoMockDb} from '@/msw/mockDbs/todoMockDb'
import {AppProviders} from '@/providers/AppProviders'
import type {UseMutationResult} from '@tanstack/react-query'
import {render, screen} from '@testing-library/react'
import userEvent, {type UserEvent} from '@testing-library/user-event'
import {todoApi} from '../api/todoApi'
import type {ITodo} from '../types/ITodoApi'
import {TodoItem} from './TodoItem'

describe('TodoItem', () => {
  let todo: ITodo | undefined

  beforeEach(() => {
    todo = todoMockDb.getTodo(1)
  })

  afterEach(() => {
    todoMockDb.resetTodos()
    vi.restoreAllMocks()
  })

  const renderComponent = (): {user: UserEvent} => {
    const user = userEvent.setup()

    render(<TodoItem todo={todo!} />, {wrapper: AppProviders})

    return {
      user,
    }
  }

  it('should render todo with provided todo object', () => {
    renderComponent()

    expect(screen.getByText(todo!.task)).toBeInTheDocument()
  })

  it('should show toast when checkbox is clicked', async () => {
    const {user} = renderComponent()
    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)

    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByText(/todo updated/i)).toBeInTheDocument()
  })

  it('should show input field when edit button is clicked', async () => {
    const {user} = renderComponent()
    const editButton = screen.getByRole('button', {name: /edit/i})

    await user.click(editButton!)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should call update todo when done button is clicked', async () => {
    const updateTodo = vi.fn()

    vi.spyOn(todoApi, 'useUpdateTodo').mockReturnValue({
      mutate: updateTodo,
      isPending: false,
    } as unknown as UseMutationResult<ITodo, Error, ITodo, unknown>)

    const {user} = renderComponent()
    const editButton = screen.getByRole('button', {name: /edit/i})
    await user.click(editButton!)

    const input = screen.getByRole('textbox')
    const newTask = ' a new task'
    await user.type(input, newTask)

    const doneButton = screen.getByRole('button', {name: /done/i})
    await user.click(doneButton)

    expect(updateTodo).toHaveBeenCalledWith({
      ...todo,
      task: todo!.task + newTask,
    })
  })

  it('should call delete todo when delete button in modal is clicked', async () => {
    const deleteTodo = vi.fn()

    vi.spyOn(todoApi, 'useDeleteTodo').mockReturnValue({
      mutate: deleteTodo,
      isPending: false,
    } as unknown as UseMutationResult<void, Error, number, unknown>)

    const {user} = renderComponent()
    const deleteButton = screen.getByRole('button', {name: /delete/i})

    await user.click(deleteButton)

    expect(
      screen.getByText(/are you sure you want to delete/i),
    ).toBeInTheDocument()

    const confirmDeleteButton = screen.getByRole('button', {name: /delete/i})
    await user.click(confirmDeleteButton)

    expect(deleteTodo).toHaveBeenCalledWith(todo!.id)
  })

  it('should call update todo when enter key is pressed', async () => {
    const updateTodo = vi.fn()

    vi.spyOn(todoApi, 'useUpdateTodo').mockReturnValue({
      mutate: updateTodo,
      isPending: false,
    } as unknown as UseMutationResult<ITodo, Error, ITodo, unknown>)

    const {user} = renderComponent()
    const editButton = screen.getByRole('button', {name: /edit/i})
    await user.click(editButton!)

    const input = screen.getByRole('textbox')
    const newTask = ' a new task'
    await user.type(input, newTask)

    await user.keyboard('{Enter}')

    expect(updateTodo).toHaveBeenCalledWith({
      ...todo,
      task: todo!.task + newTask,
    })
  })

  it('should close delete confirmation modal when cancel button is clicked', async () => {
    const deleteTodo = vi.fn()

    vi.spyOn(todoApi, 'useDeleteTodo').mockReturnValue({
      mutate: deleteTodo,
      isPending: false,
    } as unknown as UseMutationResult<void, Error, number, unknown>)

    const {user} = renderComponent()
    const deleteButton = screen.getByRole('button', {name: /delete/i})

    await user.click(deleteButton)

    expect(
      screen.getByText(/are you sure you want to delete/i),
    ).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', {name: /cancel/i})
    await user.click(cancelButton)

    expect(
      screen.queryByText(/are you sure you want to delete/i),
    ).not.toBeInTheDocument()

    expect(deleteTodo).not.toHaveBeenCalled()
  })
})
