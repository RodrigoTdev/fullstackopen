import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { AddBlogForm } from './AddBlogForm'

test('submit button check', async () => {
  const mockHandler = vi.fn()
  const { container } = render(<AddBlogForm handleSubmit={mockHandler} />)

  const user = userEvent.setup()
  const submitButton = container.querySelector('.submit-button')
  await user.click(submitButton)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})
