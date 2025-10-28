import {BrowserRouter, Route, Routes} from 'react-router'
import {APP_NAME} from './constants/appConstants'
import {TodoListScreen} from './screens/TodoListScreen'
import {Navbar} from './screens/components/Navbar'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar productName={APP_NAME} />}>
          <Route element={<TodoListScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
