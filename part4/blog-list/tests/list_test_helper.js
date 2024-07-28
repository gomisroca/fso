const _ = require('lodash');

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => {
        return acc + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    return blogs.reduce((acc, blog) => {
        if (blog.likes > acc.likes) {
            return  {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
        return acc
    }, {likes: 0})
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    
    if (blogs.length === 1) {
        return { author: blogs[0].author, blogs: 1 };
    }

    const groupByAuthor = _.groupBy(blogs, 'author')

    const authorBlogCount = _.map(groupByAuthor, (blogs, author) => {
        return {
            author: author,
            blogs: blogs.length
        }
    })

    const mostBlogs = _.maxBy(authorBlogCount, 'blogs')

    return mostBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    if (blogs.length === 1) {
        return { author: blogs[0].author, likes: blogs[0].likes };
    }

    const groupByAuthor = _.groupBy(blogs, 'author')

    const authorLikes = _.map(groupByAuthor, (blogs, author) => {
        return {
            author: author,
            likes: blogs.reduce((acc, blog) => {
                return acc + blog.likes
            }, 0)
        }
    })

    const mostLikes = _.maxBy(authorLikes, 'likes')    

    return mostLikes
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}