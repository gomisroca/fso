import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('clicking the like button twice increments the likes', async () => {
    const mockHandler = vi.fn()
    render(<BlogForm createBlog={mockHandler} />)
    const user = userEvent.setup()

    const title = screen.getByTestId('titleInput')
    const author = screen.getByTestId('authorInput')
    const url = screen.getByTestId('urlInput')

    await user.type(title, 'My Blog')
    await user.type(author, 'John Doe')
    await user.type(url, 'https://example.com')

    // Click the button to add a blog
    const addBlogButton = screen.getByTestId('addBlogButton')
    await user.click(addBlogButton)

    // Verify the handler is called once on submit
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})