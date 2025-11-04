import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

interface IInitialState {
  query: string
  type: string
}

const initialState: IInitialState = {
  query: '',
  type: '',
}

interface ITodoStore extends IInitialState {
  setQuery: (query: string) => void
  setType: (type: string) => void
}

export const useTodoStore = create<ITodoStore>()(
  devtools(set => ({
    ...initialState,
    setQuery: (query: string): void => set({query}),
    setType: (type: string): void => set({type}),
  })),
)
