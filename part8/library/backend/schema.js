const { merge } = require('lodash');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { typeDefs: Author, resolvers: authorResolvers } = require('./schemas/author.js');
const { typeDefs: Book, resolvers: bookResolvers } = require('./schemas/book.js');
const { typeDefs: User, resolvers: userResolvers } = require('./schemas/user.js');
const { typeDefs: Query} = require('./schemas/query.js');
const { typeDefs: Mutation } = require('./schemas/mutation.js');
const { typeDefs: Subscription } = require('./schemas/subscription.js');

module.exports = makeExecutableSchema({
  typeDefs: [ Query, Mutation, Subscription, Author, Book, User ],
  resolvers: merge(userResolvers, bookResolvers, authorResolvers),
})