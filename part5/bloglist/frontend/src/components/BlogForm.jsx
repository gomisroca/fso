import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

const BlogForm = forwardRef(({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    createBlog(blogObj)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
              Title: <input data-testid='titleInput' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
              Author: <input data-testid='authorInput' value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
              Url: <input data-testid='urlInput' value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button data-testid='addBlogButton' type="submit">Add Blog</button>
        </div>
      </form>
    </>
  )
})

BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm