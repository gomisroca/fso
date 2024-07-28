const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const helper = require('./api_test_helper')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const api = supertest(app)

describe('when blogs exist', () => {
    beforeEach(async () => {  
        await Blog.deleteMany({})    
        await Blog.insertMany(helper.initialBlogs)

        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })
    
    describe('getting all blogs', () => {
        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned', async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)

            assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })

        test('blogs have id', async () => {
            const response = await api
                .get('/api/blogs')
                .expect(200)

            // Find some specific blog in the list of initial blogs, in this case index 0
            const expectedBlog = helper.initialBlogs[0]
            // Find the blog in the response body
            const foundBlog = response.body.find(blog => blog.title === expectedBlog.title)

            // Check that both have the same ID
            assert.deepStrictEqual(foundBlog.id, expectedBlog._id.toString())
        })
    })

    describe('creating a blog', () => {
        test('valid creation returns 201', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }

            const userResponse = await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const beforeBlogs = await helper.getBlogsInDb()

            const newBlog = {
                title: 'Go To Statement Considered Good',
                author: 'Edsger W. Dijkstra',
                url: 'http://google.com',
                likes: 13,
            }

            const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
            const afterBlogs = await helper.getBlogsInDb()   
        
            assert.strictEqual(afterBlogs.length, beforeBlogs.length + 1)
            assert.deepStrictEqual(response.body.title, 'Go To Statement Considered Good')
        })

        test('missing name returns 400', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }

            const userResponse = await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            // Create a new blog with missing name
            const newBlog = {
                author: 'Edsger W. Dijkstra',
                url: 'http://google.com',
                likes: '12',
            }

            // Post to /api/blogs for blog creation and expect 400
            const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            // Check that the error message is correct
            assert.deepStrictEqual(response.body.message, 'Title must be a string')
        })

        test('missing url returns 400', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }

            const userResponse = await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const newBlog = {
                title: 'Go To Statement Considered Good',
                author: 'Edsger W. Dijkstra',
                likes: '12',
            }

            const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            // Check that the error message is correct
            assert.deepStrictEqual(response.body.message, 'URL must be a string')
        })

        test('likes default to zero', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }

            const userResponse = await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const newBlog = {
                title: 'Go To Statement Considered Good',
                author: 'Edsger W. Dijkstra',
                url: 'http://google.com',
            }
        
            const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(response.body.likes, 0)
        })

        test('if user not authorized returns 401', async () => {
            const newBlog = {
                title: 'Go To Statement Considered Good',
                author: 'Edsger W. Dijkstra',
                url: 'http://google.com',
                likes: 13,
            }

            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
        })
    })

    describe('updating a blog', () => {
        test('successful update returns 204', async () => {
            // Update the blog, it should return 204
            await api
            .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
            .send({
                likes: 25,
            })
            .expect(204)
            
            const existingBlogs = await helper.getBlogsInDb()   
            const foundBlog = existingBlogs.find(blog => blog.title === helper.initialBlogs[0].title)

            // Check that the blog was updated
            assert.deepStrictEqual(foundBlog.likes, 25)
        })

        test('if blog does not exist update returns 404', async () => {
            // Update a non-existent blog, it should return 404
            await api
            .put(`/api/blogs/5a422a851b54a67d623741f7`)
            .send({
                likes: 25,
            })
            .expect(404)
        })
    })

    describe('deleting a blog', () => {    
        test('successful delete returns 204', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }

            const userResponse = await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const newBlog = {
                title: 'Go To Statement Considered Good',
                author: 'Edsger W. Dijkstra',
                url: 'http://google.com',
                likes: 13,
            }

            const newBlogResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            // Delete the blog, it should return 204
            await api
            .delete(`/api/blogs/${newBlogResponse.body.id}`)
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .expect(204)
        })
        
        test('if blog does not exist delete returns 404', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }
            const userResponse = await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            // Delete a non-existent blog, it should return 404
            await api
            .delete(`/api/blogs/5a422a851b54a67d623741f7`)
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .expect(404)
        })

        test('if user not authorized delete returns 401', async () => {
            // Delete the blog, it should return 401
            await api
            .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
            .expect(401)
        })
    })
})

describe('when users exist', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })

    describe('creating a user', () => {
        test('valid creation returns 201', async () => {
            const usersBefore = await helper.getUsersInDb()

            // Create a new valid user
            const newUser = {
                username: 'johndoe',
                name: 'John Doe',
                password: 'secret',
            }
            
            // Post to /api/users for user creation and expect 201
            const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)            
            
            // Get all users from db
            const usersAfter = await helper.getUsersInDb()
            const usernames = usersAfter.map(u => u.username)
        
            // Check that the new user was added to db
            assert.strictEqual(usersAfter.length, usersBefore.length + 1)
            assert(usernames.includes(newUser.username))
        })

        test('username already exists returns 400', async () => {
            const usersBefore = await helper.getUsersInDb()

            // Create a new valid user
            const newUser = {
                username: 'root',
                name: 'John Doe',
                password: 'secret',
            }
            
            // Post to /api/users for user creation and expect 400
            const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            const usersAfter = await helper.getUsersInDb()

            assert(response.body.error.includes('Expected `username` to be unique'))
            assert.strictEqual(usersAfter.length, usersBefore.length)
        })

        test('username too short returns 400', async () => {
            const usersBefore = await helper.getUsersInDb()

            const newUser = {
                username: 'a',
                name: 'John Doe',
                password: 'secret',
            }
            
            const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            const usersAfter = await helper.getUsersInDb()   
            assert.strictEqual(usersAfter.length, usersBefore.length)
            assert.deepStrictEqual(response.body.error, 'Username must be at least 3 characters')
        })

        test('password too short returns 400', async () => {
            const usersBefore = await helper.getUsersInDb()

            const newUser = {
                username: 'johndoe',
                name: 'John Doe',
                password: 's',
            }
            
            const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            const usersAfter = await helper.getUsersInDb()   
            assert.strictEqual(usersAfter.length, usersBefore.length)
            assert.deepStrictEqual(response.body.error, 'Password must be at least 3 characters')
        })

        test('missing password returns 400', async () => {
            const usersBefore = await helper.getUsersInDb()

            const newUser = {
                username: 'johndoe',
                name: 'John Doe',
            }
            
            const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)            
            
            const usersAfter = await helper.getUsersInDb()
            assert.strictEqual(usersAfter.length, usersBefore.length)
            assert.deepStrictEqual(response.body.error, 'Password must be a string')
        })

        test('missing username returns 400', async () => {
            const usersBefore = await helper.getUsersInDb()

            const newUser = {
                name: 'John Doe',
                password: 'secret',
            }
            
            const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)            
            
            const usersAfter = await helper.getUsersInDb()
            assert.strictEqual(usersAfter.length, usersBefore.length)
            assert.deepStrictEqual(response.body.error, 'Username must be a string')
        })
    })

    describe('logging in', () => {
        test('valid login returns 200', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }

            await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })

        test('invalid login returns 401', async () => {
            const existingUser = {
                username: 'root',
                password: 'wrongpassword',
            }

            const response = await api
                .post('/api/login')
                .send(existingUser)
                .expect(401)
                .expect('Content-Type', /application\/json/)
            
            assert.deepStrictEqual(response.body.error, 'Invalid Username or Password')
        })
    })
    
    describe('creating a blog', () => {
        test('valid creation returns 201', async () => {
            const existingUser = {
                username: 'root',
                password: 'secret',
            }

            const userResponse = await api
            .post('/api/login')
            .send(existingUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const newBlog = {
                title: 'Go To Statement Considered Somewhat Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://google.com',
                likes: 10,
            }

            await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${userResponse.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})