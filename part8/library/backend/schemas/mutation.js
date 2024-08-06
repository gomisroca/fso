const typeDefs = `
  type Mutation {
    _empty: String
  }

  extend type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }

  extend type Mutation {
    editAuthor(
      name: String!
      born: Int!
    ): Author
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
`

module.exports = { typeDefs }