import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'

describe('Blog', () => {
  test('loads and displays title and author', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'root',
      url: 'https://reactpatterns.com/',
      likes: 0,
    }

    const { container } = render(<Blog blog={blog} />)
    // screen.debug()

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(title).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(author).toHaveTextContent('root')
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })
  test('loads and displays url and likes whe button is clicked', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library 2',
      author: 'root',
      url: 'https://reactpatterns2.com/',
      likes: 10,
    }

    const mockHandler = vi.fn()

    const { container } = render(
      <Blog
        blog={blog}
        show={mockHandler}
      />
    )
    // screen.debug()

    const user = userEvent.setup()

    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')
    const button = container.querySelector('.show')
    await user.click(button)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })
})
