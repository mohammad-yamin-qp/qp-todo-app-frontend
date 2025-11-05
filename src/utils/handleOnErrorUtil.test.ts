import {useWuShowToast} from '@npm-questionpro/wick-ui-lib'
import {handleErrorResponse} from './handleOnErrorUtil'

vi.mock('@npm-questionpro/wick-ui-lib', () => ({
  useWuShowToast: vi.fn(),
}))

describe('handleErrorResponse', () => {
  const mockedUseWuShowToast = vi.mocked(useWuShowToast)

  it('should call showToast with the error message', () => {
    const showToast = vi.fn()
    mockedUseWuShowToast.mockReturnValue({showToast})

    const error = new Error('Something went wrong')
    handleErrorResponse(error)

    expect(showToast).toHaveBeenCalledWith({
      variant: 'error',
      message: error.message,
    })
  })
})
