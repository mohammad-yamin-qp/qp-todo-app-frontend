import {useWuShowToast} from '@npm-questionpro/wick-ui-lib'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import axios from 'axios'
import {QUERY_KEYS} from '../../../constants/queryKeysConstants'
import {handleErrorResponse} from '../../../utils/handleOnErrorUtil'
import type {ITodoApi} from '../types/ITodoApi'

const getTodos = async (): Promise<ITodoApi[]> => {
  const response = await axios.get<ITodoApi[]>('/api/todos')
  return response.data
}

const useGetTodos = (): UseQueryResult<ITodoApi[], Error> => {
  return useQuery<ITodoApi[], Error>({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: getTodos,
  })
}

const createTodo: (body: ITodoApi) => Promise<ITodoApi> = async (
  body: ITodoApi,
) => {
  const response = await axios.post<ITodoApi>('/api/todos', body)
  return response.data
}

const useCreateTodo = (
  onSuccess?: () => void,
): UseMutationResult<ITodoApi, Error, ITodoApi, unknown> => {
  const queryClient = useQueryClient()
  const {showToast} = useWuShowToast()

  return useMutation<ITodoApi, Error, ITodoApi>({
    mutationFn: createTodo,
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
      onSuccess?.()
      showToast({
        variant: 'success',
        message: 'Todo created successfully',
      })
    },
    onError: handleErrorResponse,
  })
}

const updateTodo = async (body: ITodoApi): Promise<ITodoApi> => {
  const response = await axios.put<ITodoApi>(`/api/todos/${body.id}`, body)
  return response.data
}

const useUpdateTodo = (): UseMutationResult<
  ITodoApi,
  Error,
  ITodoApi,
  unknown
> => {
  const queryClient = useQueryClient()
  const {showToast} = useWuShowToast()

  return useMutation<ITodoApi, Error, ITodoApi>({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
      showToast({
        variant: 'success',
        message: 'Todo updated successfully',
      })
    },
    onError: handleErrorResponse,
  })
}

const deleteTodo = async (id: number): Promise<void> => {
  const response = await axios.delete(`/api/todos/${id}`)
  return response.data
}

const useDeleteTodo = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  const {showToast} = useWuShowToast()

  return useMutation<void, Error, number>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.TODOS]})
      showToast({
        variant: 'success',
        message: 'Todo deleted successfully',
      })
    },
    onError: handleErrorResponse,
  })
}

export const todoApi = {
  useGetTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
}
