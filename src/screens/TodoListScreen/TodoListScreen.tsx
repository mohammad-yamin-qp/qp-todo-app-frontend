import {WuButton} from '@npm-questionpro/wick-ui-lib'
import {lazy, useState} from 'react'
import {FilterBar} from './components/FilterBar'
import {HeadingTitle} from './components/HeadingTitle'
import {TodoList} from './components/TodoList'
const AddTodoModal = lazy(() =>
  import('./components/AddTodoModal').then(module => ({
    default: module.AddTodoModal,
  })),
)

export const TodoListScreen: React.FC = () => {
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false)

  return (
    <>
      <section className="container mx-auto flex flex-col justify-center items-center">
        <HeadingTitle title="Todo List" />

        <div className="flex justify-center items-center gap-4">
          <FilterBar />
          <WuButton
            Icon={<span className="wm-add" />}
            iconPosition="left"
            onClick={() => setIsAddTodoModalOpen(true)}
          >
            Add new
          </WuButton>
        </div>

        <div className="mt-8 w-full">
          {/* Todo List Component */}
          <TodoList />
        </div>
      </section>
      {isAddTodoModalOpen && (
        <AddTodoModal
          onClose={() => setIsAddTodoModalOpen(false)}
          open={isAddTodoModalOpen}
        />
      )}
    </>
  )
}
