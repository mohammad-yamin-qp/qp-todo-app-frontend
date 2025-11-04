import {render, screen, waitFor} from '@testing-library/react'
import userEvent, {type UserEvent} from '@testing-library/user-event'
import {API_BASE_URL} from '../../../constants/appConstants'
import {todoMockDb} from '../../../msw/mockDbs/todoMockDb'
import {
  delay,
  http,
  HttpResponse,
  mswTestServer,
} from '../../../msw/mswTestServer'
import {AppProviders} from '../../../providers/AppProviders'
import {AddTodoModal} from './AddTodoModal'

describe('AddTodoModal', () => {
  const renderComponent: () => {
    onClose: () => void
    taskInput: HTMLElement
    closeButton: HTMLElement
    getSaveButton: () => HTMLElement
    user: UserEvent
  } = () => {
    const onClose = vi.fn()
    render(<AddTodoModal open onClose={onClose} />, {wrapper: AppProviders})

    const taskInput = screen.getByPlaceholderText(/mind/i)
    const closeButton = screen.getByRole('button', {name: /close/i})
    const getSaveButton = (): HTMLElement =>
      screen.getByRole('button', {name: /save/i})
    const user = userEvent.setup()

    return {
      onClose,
      taskInput,
      closeButton,
      getSaveButton,
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
    const {getSaveButton} = renderComponent()
    const saveButton = getSaveButton()

    expect(saveButton).toBeInTheDocument()
  })

  it('should call api with task data and create a todo', async () => {
    const {getSaveButton, taskInput, user} = renderComponent()
    const task = 'New Todo Task'
    const addTodoSpy = vi.spyOn(todoMockDb, 'addTodo')
    const saveButton = getSaveButton()

    await user.click(taskInput)
    await user.type(taskInput, task)
    expect(taskInput).toHaveValue(task)
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

  it('should disable save button when saving todo', async () => {
    mswTestServer.use(
      http.get(`${API_BASE_URL}api/todos`, async () => {
        await delay(5000)
        return HttpResponse.json(todoMockDb)
      }),
    )
    const {getSaveButton, user, taskInput} = renderComponent()
    const saveButton = getSaveButton()
    expect(saveButton).not.toBeDisabled()

    await user.click(taskInput)
    await user.type(taskInput, 'New Todo Task')
    await user.click(saveButton)

    waitFor(() => {
      expect(screen.getByRole('button', {name: /save/i})).toBeDisabled()
    })
  })

  it('should clear task input field and call onClose', async () => {
    const {getSaveButton, taskInput, onClose, user} = renderComponent()
    const task = 'New Todo Task'
    const saveButton = getSaveButton()

    await user.click(taskInput)
    await user.type(taskInput, task)
    await user.click(saveButton)

    expect(taskInput).toHaveValue('')
    await waitFor(() => {
      expect(onClose).toBeCalled()
    })
  })
})
