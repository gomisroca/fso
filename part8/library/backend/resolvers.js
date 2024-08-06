const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      if(args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author, genres: args.genre }).populate('author')
      }
      if(args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author }).populate('author')
      }
      if(args.genre) {
        return Book.find({genres: args.genre}).populate('author')
      }
    },
    allAuthors: async() => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation:{
    addBook: async (_, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new GraphQLError('You must be logged in', {
          extensions: { 
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const existingBook = await Book.findOne({ title: args.title })
      if (existingBook) {
        throw new GraphQLError('Title must be unique', {
          extensions: { 
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title 
          }
        })
      }
      if (args.title.length < 5) {
        throw new GraphQLError('Title must be at least 5 characters', {
          extensions: { 
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title 
          }
        })
      }
      if (args.author.length < 4) {
        throw new GraphQLError('Author name must be at least 4 characters', {
          extensions: { 
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author 
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: { 
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author 
            }
          })
        }
      }
      const book = new Book({ title: args.title, author: author._id, published: args.published, genres: args.genres })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: { 
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title 
          }
        })
      }

      if (!author.books) {
        author.books = []
      }
      author.books.push(book._id)
      await author.save()

      pubsub.publish('BOOK_ADDED', { newBook: book })

      return book
      
    },
    editAuthor: async (_, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new GraphQLError('You must be logged in', {
          extensions: { 
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const existingAuthor = await Author.findOne({ name: args.name })
      if (!existingAuthor) {
        throw new GraphQLError('No author found', {
          extensions: { 
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name 
          }
        })
      }
      existingAuthor.born = args.born
      return existingAuthor.save()
    },
    createUser: async (_, args) => {
      const existingUser = await User.findOne({ username: args.username })
      if (existingUser) {
        throw new GraphQLError('Username must be unique', {
          extensions: { 
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username 
          }
        })
      }

      const user = new User({ ...args })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Saving user failed', {
            extensions: { 
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong Credentials', {
          extensions: { 
            code: 'BAD_USER_INPUT'
          }
        })
      }    
      
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    newBook: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    }
  },
}

module.exports = resolvers