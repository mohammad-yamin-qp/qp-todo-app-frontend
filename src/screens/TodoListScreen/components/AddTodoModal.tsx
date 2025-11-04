import {
  WuButton,
  WuModal,
  WuModalContent,
  WuModalFooter,
  WuModalHeader,
  WuTextarea,
} from '@npm-questionpro/wick-ui-lib'
import {memo} from 'react'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {todoApi} from '../api/todoApi'
import type {IAddTodoForm} from '../types/IAddTodoForm'
import {AddTodoFormValidationSchema} from '../validations/AddTodoFormValidations'

interface IProps {
  open: boolean
  onClose: () => void
}

export const AddTodoModal: React.NamedExoticComponent<IProps> = memo(
  ({open, onClose}) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: {errors},
    } = useForm<IAddTodoForm>()
    const {mutate: createTodo, isPending} = todoApi.useCreateTodo(onSuccess)

    const onSubmit: SubmitHandler<IAddTodoForm> = data => {
      createTodo({
        task: data.task,
        completed: false,
      })
    }

    function onSuccess(): void {
      reset()
      onClose()
    }

    return (
      <WuModal open={open} hideCloseButton>
        <WuModalHeader>Add Todo</WuModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <WuModalContent>
            <WuTextarea
              Label="Task"
              placeholder="What's on your mind?"
              labelPosition="top"
              rows={5}
              required
              {...register('task', AddTodoFormValidationSchema.task)}
            />
            {errors.task && <span>{errors.task.message}</span>}
          </WuModalContent>
          <WuModalFooter>
            <WuButton onClick={onClose} variant="secondary">
              Close
            </WuButton>
            <WuButton type="submit" loading={isPending} disabled={isPending}>
              Save
            </WuButton>
          </WuModalFooter>
        </form>
      </WuModal>
    )
  },
)

AddTodoModal.displayName = 'AddTodoModal'
