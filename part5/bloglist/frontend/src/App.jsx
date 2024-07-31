import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const lsUserJSON = window.localStorage.getItem('bloglistUser')
    if (lsUserJSON) {
      const lsUser = JSON.parse(lsUserJSON)
      setUser(lsUser)
      blogService.setToken(lsUser.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setSuccessMessage(`${user.name} logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('bloglistUser')
  }

  const handleCreateBlog = (blogObj) => {
    blogService
      .create(blogObj)
      .then(newBlog => {
        setBlogs([...blogs, newBlog])
        setSuccessMessage(`${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setErrorMessage(null)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setSuccessMessage(null)
      })
  }

  const handleLikeBlog = (blogObj) => {
    let updatedBlog = blogObj
    updatedBlog.likes = updatedBlog.likes + 1
    blogService.update(updatedBlog.id, updatedBlog)
      .then(blog => {
        setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
      })
  }

  return (
    <div>
      {successMessage && <Notification message={successMessage} type='success' />}
      {errorMessage && <Notification message={errorMessage} type='error' />}
      <h2>Blogs</h2>
      {user === null ?
        <LoginForm
          handleSubmit={handleLogin}
        />
        :
        <>
          <p>
            {user.name} logged in
            <button onClick={() => handleLogout()} data-testid='logoutButton'>Logout</button>
          </p>
          <Togglable buttonLabel="New Blog">
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user} handleLikeBlog={handleLikeBlog} />
          )}
        </>
      }
    </div>
  )
}

export default App