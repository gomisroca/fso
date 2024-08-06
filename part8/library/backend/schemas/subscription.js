const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDefs = `
  type Subscription {
    _empty: String
  }
  extend type Subscription {
    newBook: Book!
  }
`

module.exports = { typeDefs, pubsub }