import {render, screen} from '@testing-library/react'
import {APP_NAME} from '../../constants/appConstants'
import {Navbar} from './Navbar'

describe('Navbar', () => {
  const renderComponent = (): void => {
    render(<Navbar productName={APP_NAME} />)
  }
  it('should render navbar', () => {
    renderComponent()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('should render product name', () => {
    renderComponent()
    expect(screen.getByText(APP_NAME)).toBeInTheDocument()
  })
})
