import {
  WuButton,
  WuModal,
  WuModalContent,
  WuModalFooter,
  WuModalHeader,
} from '@npm-questionpro/wick-ui-lib'

interface IProps {
  isOpen: boolean
  onDelete: () => void
  onCancel: () => void
}

export const DeleteConfirmationModal: React.FC<IProps> = ({
  isOpen,
  onDelete,
  onCancel,
}) => {
  return (
    <WuModal open={isOpen} hideCloseButton>
      <WuModalHeader>Confirmation</WuModalHeader>
      <WuModalContent>
        Are you sure you want to delete this item?
      </WuModalContent>
      <WuModalFooter>
        <WuButton onClick={onCancel} variant="secondary">
          Cancel
        </WuButton>
        <WuButton onClick={onDelete} variant="primary">
          Delete
        </WuButton>
      </WuModalFooter>
    </WuModal>
  )
}
