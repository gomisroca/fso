import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'My Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 0,
    user: {
      name: 'John Doe',
      username: 'johndoe'
    }
  }

  test('renders blog title and author but details are hidden', () => {
    render(<Blog blog={blog} />)

    screen.getByText('My Blog', { exact: false })
    screen.getByText('John Doe', { exact: false })
    expect(screen.queryByText('https://example.com')).toBeNull()
  })

  test('clicking the details button toggles the details', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()

    // Verify the details are initially hidden
    expect(screen.queryByText('https://example.com')).toBeNull()

    // Click the button to show details
    const button = screen.getAllByRole('button')[0]
    await user.click(button)

    // Verify the details are now visible
    expect(screen.getByText('https://example.com')).toBeInTheDocument()
    expect(screen.getByText('Likes 0', { exact: false })).toBeInTheDocument()

    // Click the button to hide details
    await user.click(button)

    // Verify the details are hidden again
    expect(screen.queryByText('https://example.com')).toBeNull()
  })

  test('clicking the like button twice triggets the handler twice', async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} handleLikeBlog={mockHandler} />)
    const user = userEvent.setup()
    // Click the button to show details
    const detailsButton = screen.getByTestId('detailsButton')
    await user.click(detailsButton)

    // Verify the likes are now visible and initially zero
    const likeButton = screen.getByTestId('likeButton')
    expect(screen.getByText('Likes 0', { exact: false })).toBeInTheDocument()
    await user.click(likeButton)
    await user.click(likeButton)

    // Verify the handler is called twice
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})