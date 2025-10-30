import {BrowserRouter, Route, Routes} from 'react-router'
import {Navbar} from './components/Navbar'
import {APP_NAME} from './constants/appConstants'
import {TodoListScreen} from './screens/TodoListScreen/TodoListScreen'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar productName={APP_NAME} />}>
          <Route path="/" element={<TodoListScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
