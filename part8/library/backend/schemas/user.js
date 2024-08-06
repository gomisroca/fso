
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const typeDefs = `
  extend type Query {
    me: User
  }

  extend type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
    
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation:{
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
}

module.exports = { typeDefs, resolvers }