const Book = require('../models/book')
const { pubsub } = require('./subscription')
const { GraphQLError } = require('graphql')

const typeDefs = `
  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }

  extend type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }

  extend type Subscription {
    newBook: Book!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
`

const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
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
      
    }
  },
  Subscription: {
    newBook: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    }
  }
}

module.exports = { typeDefs, resolvers }