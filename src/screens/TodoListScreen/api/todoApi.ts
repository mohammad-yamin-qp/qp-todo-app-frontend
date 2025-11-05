import {useWuShowToast} from '@npm-questionpro/wick-ui-lib'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import {api} from '../../../api/axios'
import {QUERY_KEYS} from '../../../constants/queryKeysConstants'
import {handleErrorResponse} from '../../../utils/handleOnErrorUtil'
import type {ITodo} from '../types/ITodoApi'

const getTodos = async (params?: Record<string, string>): Promise<ITodo[]> => {
  const response = await api.get<ITodo[]>('/api/todos', {params})
  return response.data
}

const useGetTodos = (
  params?: Record<string, string>,
): UseQueryResult<ITodo[], Error> => {
  return useQuery<ITodo[], Error>({
    queryKey: [QUERY_KEYS.TODOS, params],
    queryFn: () => getTodos(params),
  })
}

const createTodo: (body: ITodo) => Promise<ITodo> = async (body: ITodo) => {
  const response = await api.post<ITodo>('/api/todos', body)
  return response.data
}

const useCreateTodo = (
  onSuccess?: () => void,
): UseMutationResult<ITodo, Error, ITodo, unknown> => {
  const queryClient = useQueryClient()
  const {showToast} = useWuShowToast()

  return useMutation<ITodo, Error, ITodo>({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      })
      onSuccess?.()
      showToast({
        variant: 'success',
        message: 'Todo created successfully',
      })
    },
    onError: handleErrorResponse,
  })
}

const updateTodo = async (body: ITodo): Promise<ITodo> => {
  const response = await api.put<ITodo>(`/api/todos/${body.id}`, body)
  return response.data
}

const useUpdateTodo = (
  onSuccess?: () => void,
): UseMutationResult<ITodo, Error, ITodo, unknown> => {
  const queryClient = useQueryClient()
  const {showToast} = useWuShowToast()

  return useMutation<ITodo, Error, ITodo>({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      })
      showToast({
        variant: 'success',
        message: 'Todo updated successfully',
      })
      onSuccess?.()
    },
    onError: handleErrorResponse,
  })
}

const deleteTodo = async (id: number): Promise<void> => {
  const response = await api.delete(`/api/todos/${id}`)
  return response.data
}

const useDeleteTodo = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  const {showToast} = useWuShowToast()

  return useMutation<void, Error, number>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      })
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
