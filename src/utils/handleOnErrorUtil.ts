import {useWuShowToast} from '@npm-questionpro/wick-ui-lib'

export const handleErrorResponse = (error: Error): void => {
  const {showToast} = useWuShowToast()
  showToast({
    variant: 'error',
    message: error.message,
  })
}
