const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

require('dotenv').config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });

  server.applyMiddleware({ app, cors: true });

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const port = process.env.PORT || 4000;

  app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
};

startServer();
