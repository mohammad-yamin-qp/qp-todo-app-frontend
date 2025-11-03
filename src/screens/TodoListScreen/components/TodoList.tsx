import {WuLoader} from '@npm-questionpro/wick-ui-lib'
import {todoApi} from '../api/todoApi'
import {TodoItem} from './TodoItem'

export const TodoList: React.FC = () => {
  const {data: todos, isPending} = todoApi.useGetTodos()

  if (isPending) {
    return (
      <div className="!border !shadow-md !rounded-md p-8 space-y-4 w-full flex justify-center items-center">
        <WuLoader size="md" />
      </div>
    )
  }

  return (
    <div className="!border !shadow-md !rounded-md p-8 space-y-4 w-full">
      {todos?.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
