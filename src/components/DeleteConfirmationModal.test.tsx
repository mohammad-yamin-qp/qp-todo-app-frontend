import {render, screen} from '@testing-library/react'
import {DeleteConfirmationModal} from './DeleteConfirmationModal'

describe('DeleteConfirmationModal', () => {
  const renderComponent = (): {onCancel: () => void; onDelete: () => void} => {
    const onCancel = vi.fn()
    const onDelete = vi.fn()

    render(
      <DeleteConfirmationModal
        isOpen={true}
        onCancel={onCancel}
        onDelete={onDelete}
      />,
    )

    return {
      onCancel,
      onDelete,
    }
  }

  it('should render Delete Confirmation Modal', () => {
    renderComponent()

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/delete this item\?/i)).toBeInTheDocument()
  })

  it('should close the modal when cancel button is clicked', () => {
    const {onCancel} = renderComponent()

    screen.getByRole('button', {name: /cancel/i}).click()

    expect(onCancel).toBeCalled()
  })

  it('should call onDelete when delete is clicked', () => {
    const {onDelete} = renderComponent()

    screen.getByRole('button', {name: /delete/i}).click()

    expect(onDelete).toBeCalled()
  })
})
