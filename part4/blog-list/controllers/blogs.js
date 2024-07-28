const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware');


blogsRouter.get('/', async (_, response) => {
    // Fetch and return all blogs
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async(request, response) => {
    const body = request.body

    const user = request.user
    if (!user) {
        response.status(401).json({
            message: 'User not Authorized'
        })
    }
    // Check if title is valid
    if(body.title === undefined) {
        response.status(400).json({
            message: 'Title must be a string'
        })
    }
    // Check if URL is valid
    if (body.url === undefined) {
        response.status(400).json({
            message: 'URL must be a string'
        })
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    // If both basic checks pass, save the blog
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
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

    response.status(204).json()
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

    await Blog.deleteOne({_id: blog._id})
    response.status(204).json()
})

module.exports = blogsRouter