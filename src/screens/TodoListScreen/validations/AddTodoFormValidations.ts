import {z} from 'zod'

export const AddTodoFormValidationSchema = z.object({
  task: z.string().min(1).max(1000),
})