import {render, screen} from '@testing-library/react'
import {HeadingTitle} from './HeadingTitle'

describe('Heading Title', () => {
  it('should render title provided correctly', () => {
    const title = 'Lorem, ipsum dolor.'
    render(<HeadingTitle title={title} />)

    const heading = screen.getByRole('heading', {name: title})

    expect(heading).toBeInTheDocument()
  })

  it('should render no title if provided title is empty', () => {
    const title = ''
    render(<HeadingTitle title={title} />)

    const heading = screen.getByText(/no title/i)

    expect(heading).toBeInTheDocument()
  })
})
