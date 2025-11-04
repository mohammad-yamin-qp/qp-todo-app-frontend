import {WuButton, WuCheckbox, WuInput} from '@npm-questionpro/wick-ui-lib'
import {useState} from 'react'
import {DeleteConfirmationModal} from '../../../components/DeleteConfirmationModal'
import {todoApi} from '../api/todoApi'
import type {ITodo} from '../types/ITodoApi'

interface IProps {
  todo: ITodo
}

export const TodoItem: React.FC<IProps> = ({todo}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [todoTask, setTodoTask] = useState(todo.task)

  const {mutate: updateTodo, isPending: isUpdating} = todoApi.useUpdateTodo(
    () => setIsEditing(false),
  )
  const {mutate: deleteTodo, isPending: isDeleting} = todoApi.useDeleteTodo()

  const onCheckboxChange = (completed: boolean): void => {
    updateTodo({...todo, completed})
  }

  const onUpdate = (): void => {
    updateTodo({...todo, task: todoTask})
  }

  const onDelete = (): void => {
    deleteTodo(todo.id!)
    setIsDeleteModalOpen(false)
  }

  const onEnterKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onUpdate()
    }
  }

  return (
    <>
      <div className="flex justify-between items-center gap-4 !border-b !border-[#1b33801c] p-2">
        <div className="flex gap-4 flex-1 w-full">
          <WuCheckbox
            checked={todo.completed}
            onChange={() => onCheckboxChange(!todo.completed)}
            disabled={isUpdating}
          />
          {isEditing ? (
            <WuInput
              value={todoTask}
              onChange={e => setTodoTask(e.target.value)}
              variant="flat"
              onKeyUp={onEnterKeyUp}
            />
          ) : (
            <p className={todo.completed ? 'line-through' : ''}>{todo.task}</p>
          )}
        </div>

        <div className="flex gap-4">
          {isEditing ? (
            <WuButton
              variant="iconOnly"
              Icon={<span className="wm-done" />}
              onClick={onUpdate}
            />
          ) : (
            <WuButton
              variant="iconOnly"
              Icon={<span className="wm-edit" />}
              onClick={() => setIsEditing(true)}
            />
          )}

          <WuButton
            variant="iconOnly"
            Icon={<span className="wm-delete" />}
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting || isDeleteModalOpen}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onDelete={onDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  )
}
