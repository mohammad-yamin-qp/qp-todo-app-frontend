import {FilterBar} from './components/FilterBar'
import {HeadingTitle} from './components/HeadingTitle'

export const TodoListScreen: React.FC = () => {
  return (
    <section className="container mx-auto">
      <HeadingTitle title="Todo List" />

      <FilterBar onSearch={console.log} onSelect={console.log} />
    </section>
  )
}
