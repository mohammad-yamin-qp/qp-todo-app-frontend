import {render, screen} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import {TODO_TYPE} from '../constants/todoTypeConstants'
import {FilterBar} from './FilterBar'

describe('FilterBar', () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const renderComponent = () => {
    const onSearch = vi.fn()
    const onSelect = vi.fn()

    render(<FilterBar onSearch={onSearch} onSelect={onSelect} />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    const selectFilter = screen.getByRole('button', {name: /select todo type/i})
    const user = userEvent.setup()

    return {
      onSearch,
      onSelect,
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

  it('should call onSearch when some text is typed in inputField', async () => {
    const {onSearch, user, searchInput} = renderComponent()
    const input = 'vitest'

    await user.click(searchInput)
    await user.type(searchInput, input)

    expect(onSearch).toBeCalledWith('vi')
  })

  it('should check selectFilter if default value All is selected', () => {
    const {selectFilter} = renderComponent()

    expect(selectFilter).toHaveTextContent(/all/i)
  })

  it('should render all the provided value to filter components', async () => {
    const {selectFilter, user} = renderComponent()

    await user.click(selectFilter)

    screen.debug()
    TODO_TYPE.forEach(todo => {
      expect(
        screen.getByRole('menuitem', {name: todo.label}),
      ).toBeInTheDocument()
    })
  })

  it('should call onSelect with selected filter value when another value selected', async () => {
    const {selectFilter, onSelect, user} = renderComponent()

    await user.click(selectFilter)

    const options = screen.getAllByRole('menuitem')
    await user.click(options[1])

    expect(onSelect).toBeCalledWith(TODO_TYPE[1])
  })
})
