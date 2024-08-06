const typeDefs = `
  type Query {
    me: User
  }
  
  extend type Query {
    bookCount: Int! 
    allBooks(author: String, genre: String): [Book!]!
  }

  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  extend type Query {
    me: User
  }
`

module.exports = { typeDefs }