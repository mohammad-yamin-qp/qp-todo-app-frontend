import {WuPrimaryNavbar} from '@npm-questionpro/wick-ui-lib'
import {useQuery, type UseQueryResult} from '@tanstack/react-query'
import {API_BASE_URL} from './constants/appConstants'
import type {IServerResponse} from './types/IServerResponse'
import type {IUser} from './types/IUser'

const fetchUser = async (): Promise<IServerResponse<IUser>> => {
  return fetch(`${API_BASE_URL}user`, {
    method: 'GET',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
}

const useUserApi = (): UseQueryResult<IServerResponse<IUser>, Error> => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })
}

const App: React.FC = () => {
  const {data, isLoading, error} = useUserApi()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error?.message || 'Something went wrong'}</div>
  }

  const user = data?.data
  if (!user) {
    throw new Error('User not found')
  }

  return (
    <>
      {/* <TodoListScreen /> */}
      <WuPrimaryNavbar
        Links={[
          <a key="home" href="#" className="active">
            Home
          </a>,
          <a key="about" href="#">
            About
          </a>,
          <a key="services" href="#">
            Services
          </a>,
          <a key="contact" href="#">
            Contact
          </a>,
        ]}
      />
      <h1>{user?.email}</h1>
    </>
  )
}

export default App
