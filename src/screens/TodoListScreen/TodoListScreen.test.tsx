import {render, screen} from '@testing-library/react'
import {TodoListScreen} from './TodoListScreen'
import { AppProviders } from '../../providers/AppProviders'

describe('TodoListScrenn', () => {
  const renderComponent = (): void => {
    render(<TodoListScreen />, { wrapper: AppProviders})
  }

  it('should render heading todo list', () => {
    renderComponent()
    const heading = screen.getByText(/todo list/i)
    expect(heading).toBeInTheDocument()
  })
})
