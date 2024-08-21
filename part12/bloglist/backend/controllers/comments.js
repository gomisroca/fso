const commentsRouter = require('express').Router()
const Blog = require('../models/blog');
const Comment = require('../models/comment')
const middleware = require('../utils/middleware');


commentsRouter.get('/', async (request, response) => {
    // Fetch and return all comments in a blog
    const comments = await Comment
    .find({})
    .populate('user', { username: 1, name: 1 }).populate('blog', { title: 1, author: 1, url: 1 })
    response.json(comments)
})
  
commentsRouter.post('/', middleware.userExtractor, async(request, response) => {
    const data = request.body
    const comment = new Comment({content: data.content})

    const user = request.user
    if (!user) {
        response.status(401).json({
            message: 'User not Authorized'
        })
    }
    // Check if title is valid
    if ((!data.content || data.content.length === 0) || (!data.blogId || data.blogId.length === 0)) {
        return response.status(400).json({ error: 'Comment content or blog ID missing' })
    }

    const blog = await Blog.findById(data.blogId)
    if (!blog) {
        response.status(404).json({
            message: 'Blog not found'
        })
    }

    comment.user = user
    comment.blog = blog
    blog.comments = blog.comments.concat(comment._id)
    user.comments = user.comments.concat(comment._id)
    
    await blog.save()
    await user.save()

    const savedComment = await comment.save()

    response.status(201).json(savedComment)
})

// commentsRouter.put('/:id', async (request, response) => {
//     const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
//     if (!blog) {
//         response.status(404).json({
//             message: 'Blog not found'
//         })
//     }

//     blog.title = request.body.title ? request.body.title : blog.title
//     blog.author = request.body.author ? request.body.author : blog.author
//     blog.url = request.body.url ? request.body.url : blog.url
//     blog.likes = request.body.likes ? request.body.likes : blog.likes

//     await blog.save()

//     response.status(200).json(blog)
// })

// commentsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
//     const blog = await Blog.findById(request.params.id)
//     if (!blog) {
//         response.status(404).json({
//             message: 'Blog not found'
//         })
//     }

//     const user = request.user
//     if (!user) {
//         response.status(404).json({
//             message: 'User not found'
//         })
//     }
//     if (blog.user.toString() !== user._id.toString()) {
//         response.status(401).json({
//             message: 'User not authorized'
//         })
//     }
    
//     user.blogs = user.blogs.filter(bl => bl._id.toString() !== blog._id.toString())
//     await user.save()

//     await Blog.deleteOne({_id: blog._id})
//     response.status(204).json()
// })

module.exports = commentsRouter