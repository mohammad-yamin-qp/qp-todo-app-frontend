import {render, screen, waitFor} from '@testing-library/react'
import userEvent, {type UserEvent} from '@testing-library/user-event'
import {todoMockDb} from '../../../msw/mockDbs/todoMockDb'
import {AppProviders} from '../../../providers/AppProviders'
import {AddTodoModal} from './AddTodoModal'

describe('AddTodoModal', () => {
  const renderComponent: () => {
    onClose: () => void
    taskInput: HTMLElement
    closeButton: HTMLElement
    saveButton: HTMLElement
    user: UserEvent
  } = () => {
    const onClose = vi.fn()
    render(<AddTodoModal open onClose={onClose} />, {wrapper: AppProviders})

    const taskInput = screen.getByPlaceholderText(/mind/i)
    const closeButton = screen.getByRole('button', {name: /close/i})
    const saveButton = screen.getByRole('button', {name: /save/i})
    const user = userEvent.setup()

    return {
      onClose,
      taskInput,
      closeButton,
      saveButton,
      user,
    }
  }

  it('should render task input field', () => {
    const {taskInput} = renderComponent()

    expect(taskInput).toBeInTheDocument()
  })

  it('should render close button', async () => {
    const {onClose, closeButton, user} = renderComponent()

    expect(closeButton).toBeInTheDocument()

    await user.click(closeButton)

    expect(onClose).toBeCalled()
  })

  it('should render save button', () => {
    const {saveButton} = renderComponent()

    expect(saveButton).toBeInTheDocument()
  })

  it('should call api with task data and create a todo', async () => {
    const {saveButton, taskInput, user} = renderComponent()
    const task = 'New Todo Task'
    const addTodoSpy = vi.spyOn(todoMockDb, 'addTodo')

    await user.type(taskInput, task)
    await user.click(saveButton)

    await waitFor(() => {
      expect(addTodoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          task,
          completed: false,
        }),
      )
    })
  })
})
