const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./list_test_helper')

const listWithOneBlog = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
    }
]

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

describe('total likes', () => {
    test('when list is empty, equals zero', () => {
        const result = helper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = helper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('when list has multiple blogs, equals the sum of likes of all', () => {
        const result = helper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })

})

describe('favorite blog', () => {
    test('when list is empty, returns null', () => {
        const result = helper.favoriteBlog([])
        assert.deepStrictEqual(result, null)
    })

    test('when list has one blog, returns that blog', () => {
        const result = helper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result.title, 'Go To Statement Considered Harmful')
    })

    test('when list has multiple blogs, returns the blog with the highest likes', () => {
        const result = helper.favoriteBlog(blogs)
        assert.deepStrictEqual(result.title, 'Canonical string reduction')
    })

})

describe('most blogs', () => {
    test('when list is empty, returns null', () => {
        const result = helper.mostBlogs([])
        assert.strictEqual(result, null)
    })

    test('when list has one blog, returns that blog author', () => {
        const result = helper.mostBlogs(listWithOneBlog)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    })

    test('when list has multiple blogs, returns the author with the most blogs', () => {
        const result = helper.mostBlogs(blogs)
        assert.strictEqual(result.author, 'Robert C. Martin')
    })
})

describe('most likes', () => {
    test('when list is empty, returns null', () => {
        const result = helper.mostLikes([])
        assert.strictEqual(result, null)
    })

    test('when list has one blog, returns that blog author and likes', () => {
        const result = helper.mostLikes(listWithOneBlog)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    })

    test('when list has multiple blogs, returns the author whose blogs have the most likes', () => {
        const result = helper.mostLikes(blogs)
        assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    })
})