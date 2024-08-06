const Author = require('../models/author')
const { GraphQLError } = require('graphql')

const typeDefs = `  
  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  extend type Mutation {
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }

  type Author {
    name: String!
    born: Int
    books: [Book!]!
    id: ID!
  }
`
const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async() => Author.find({}).populate('books'),
  },
  Mutation:{
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
    }
  },
}

module.exports = { typeDefs, resolvers }