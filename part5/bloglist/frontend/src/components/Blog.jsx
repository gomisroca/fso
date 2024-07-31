import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleLikeBlog }) => {
  const [showFullDetails, setShowFullDetails] = useState(false)
  const [blogData, setBlogData] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails)
  }

  const likeBlog = () => {
    handleLikeBlog(blogData)
  }

  const deleteBlog = () => {
    if (confirm(`Are you sure you want to delete the blog ${blogData.title} by ${blogData.author}?`)){
      blogService.remove(blogData.id)
    }
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      {blogData.title} {blogData.author}
      <button data-testid='detailsButton' onClick={() => toggleDetails()}>{showFullDetails ? 'Hide' : 'Show'} details</button>
      {showFullDetails && (
        <div className='blogDetails' data-testid='blogDetails'>
          <div>{blogData.url}</div>
          <div>Likes {blogData.likes} <button data-testid='likeButton' onClick={() => likeBlog()}>Like</button></div>
          <div>{blogData.user.name}</div>
          {user && blogData.user.username === user.username && <button data-testid='deleteButton' onClick={() => deleteBlog()}>Delete</button>}
        </div>
      )}
    </div>
  )
}
export default Blog