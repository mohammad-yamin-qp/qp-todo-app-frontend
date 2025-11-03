import {WuButton} from '@npm-questionpro/wick-ui-lib'
import {useState} from 'react'
import {AddTodoModal} from './components/AddTodoModal'
import {FilterBar} from './components/FilterBar'
import {HeadingTitle} from './components/HeadingTitle'
import {TodoList} from './components/TodoList'

export const TodoListScreen: React.FC = () => {
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false)

  return (
    <>
      <section className="container mx-auto flex flex-col justify-center items-center">
        <HeadingTitle title="Todo List" />

        <div className="flex justify-center items-center gap-4">
          <FilterBar onSearch={console.log} onSelect={console.log} />
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
