import {useTodoStore} from '@/store/todoStore'
import {render, screen} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import {TODO_TYPE} from '../constants/todoTypeConstants'
import {FilterBar} from './FilterBar'

describe('FilterBar', () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const renderComponent = () => {
    render(<FilterBar />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    const selectFilter = screen.getByRole('button', {name: /select todo type/i})
    const user = userEvent.setup()

    return {
      searchInput,
      selectFilter,
      user,
    }
  }

  it('should render search input and category select input fields', () => {
    const {searchInput, selectFilter} = renderComponent()

    expect(searchInput).toBeInTheDocument()
    expect(selectFilter).toBeInTheDocument()
  })

  it('should set query when some text is typed in inputField', async () => {
    const {user, searchInput} = renderComponent()
    const input = 'vitest'
    await user.click(searchInput)
    await user.type(searchInput, input)

    expect(useTodoStore.getState().query).toBe(input)
  })

  it('should check selectFilter if default value All is selected', () => {
    const {selectFilter} = renderComponent()

    expect(selectFilter).toHaveTextContent(/all/i)
  })

  it('should render all the provided value to filter components', async () => {
    const {selectFilter, user} = renderComponent()

    await user.click(selectFilter)

    TODO_TYPE.forEach(todo => {
      expect(
        screen.getByRole('menuitem', {name: todo.label}),
      ).toBeInTheDocument()
    })
  })

  it('should set type with selected filter value when another value selected', async () => {
    const {selectFilter, user} = renderComponent()

    await user.click(selectFilter)

    const options = screen.getAllByRole('menuitem')
    await user.click(options[1])

    expect(useTodoStore.getState().type).toBe(TODO_TYPE[1].value)
  })
})
