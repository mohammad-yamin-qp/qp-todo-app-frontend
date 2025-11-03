import {WuButton} from '@npm-questionpro/wick-ui-lib'
import {useState} from 'react'
import {AddTodoModal} from './components/AddTodoModal'
import {FilterBar} from './components/FilterBar'
import {HeadingTitle} from './components/HeadingTitle'

export const TodoListScreen: React.FC = () => {
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false)

  return (
    <>
      <section className="container mx-auto">
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
