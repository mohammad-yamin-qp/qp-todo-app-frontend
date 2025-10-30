import {render, screen} from '@testing-library/react'
import {TodoListScreen} from './TodoListScreen'

describe('TodoListScrenn', () => {
  const renderComponent = (): void => {
    render(<TodoListScreen />)
  }

  it('should render heading todo list', () => {
    renderComponent()
    const heading = screen.getByText(/todo list/i)
    expect(heading).toBeInTheDocument()
  })
})
