const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware');


blogsRouter.get('/', async (_, response) => {
    // Fetch and return all blogs
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async(request, response) => {
    const blog = new Blog(request.body)

    const user = request.user
    if (!user) {
        response.status(401).json({
            message: 'User not Authorized'
        })
    }
    // Check if title is valid
    if ((!blog.title || blog.title.length === 0) || (!blog.url || blog.url.length === 0)) {
        return response.status(400).json({ error: 'title or url missing' })
    }
    
    blog.likes = blog.likes | 0
    blog.user = user
    user.blogs = user.blogs.concat(blog._id)
    
    await user.save()

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (!blog) {
        response.status(404).json({
            message: 'Blog not found'
        })
    }

    blog.title = request.body.title ? request.body.title : blog.title
    blog.author = request.body.author ? request.body.author : blog.author
    blog.url = request.body.url ? request.body.url : blog.url
    blog.likes = request.body.likes ? request.body.likes : blog.likes

    await blog.save()

    response.status(200).json(blog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        response.status(404).json({
            message: 'Blog not found'
        })
    }

    const user = request.user
    if (!user) {
        response.status(404).json({
            message: 'User not found'
        })
    }
    if (blog.user.toString() !== user._id.toString()) {
        response.status(401).json({
            message: 'User not authorized'
        })
    }
    
    user.blogs = user.blogs.filter(bl => bl._id.toString() !== blog._id.toString())
    await user.save()

    await Blog.deleteOne({_id: blog._id})
    response.status(204).json()
})

module.exports = blogsRouter