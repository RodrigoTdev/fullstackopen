import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'

describe('Blog', () => {
  // test('loads and displays title and author', async () => {
  //   const blog = {
  //     title: 'Component testing is done with react-testing-library',
  //     author: 'root',
  //     url: 'https://reactpatterns.com/',
  //     likes: 0,
  //   }

  //   const { container } = render(<Blog blog={blog} />)
  //   // screen.debug()

  //   const title = container.querySelector('.title')
  //   const author = container.querySelector('.author')
  //   const url = container.querySelector('.url')
  //   const likes = container.querySelector('.likes')

  //   expect(title).toHaveTextContent(
  //     'Component testing is done with react-testing-library'
  //   )
  //   expect(author).toHaveTextContent('root')
  //   expect(url).not.toBeVisible()
  //   expect(likes).not.toBeVisible()
  // })
  // test('loads and displays url and likes whe button is clicked', async () => {
  //   const blog = {
  //     title: 'Component testing is done with react-testing-library 2',
  //     author: 'root',
  //     url: 'https://reactpatterns2.com/',
  //     likes: 10,
  //   }

  //   const mockHandler = vi.fn()

  //   const { container } = render(
  //     <Blog
  //       blog={blog}
  //       show={mockHandler}
  //     />
  //   )
  //   // screen.debug()

  //   const user = userEvent.setup()

  //   const url = container.querySelector('.url')
  //   const likes = container.querySelector('.likes')
  //   const button = container.querySelector('.show')
  //   await user.click(button)

  //   expect(url).toBeVisible()
  //   expect(likes).toBeVisible()
  // })

  test('clicking like twice calls event handler twice', async () => {
    // Para que funcione esta prueba tengo que pasarle la funcion del clickLike desde el padre por ahora esta dentro de el mismo
    const blog = {
      title: 'Component testing is done with react-testing-library 2',
      author: 'root',
      url: 'https://reactpatterns2.com/',
      likes: 10,
      userId: '664bfc8685fc4b63a8c99dd7',
    }

    const mockHandler = vi.fn()

    const { container } = render(
      <Blog
        blog={blog}
        clickLike={mockHandler}
      />
    )
    // screen.debug()

    const user = userEvent.setup()

    const button = container.querySelector('.show')
    await user.click(button)

    const likeButton = container.querySelector('.like-button')
    const uno = await user.click(likeButton)
    console.log(uno)
    await user.click(likeButton)

    // expect(mockHandler).toHaveBeenCalledTimes(2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
