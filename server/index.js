import { ApolloServer, gql } from 'apollo-server';
import merge from 'lodash/merge.js';
import recipeTypeDefs from './typeDefs/recipeTypeDefs.js';
import recipeResolvers from './resolvers/recipeResolvers.js';

const baseTypeDefs = gql`
  type Query
`;

const typeDefs = [
  baseTypeDefs,
  recipeTypeDefs
];

const resolvers = merge(
  {},
  recipeResolvers
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded'
});

server.listen().then(({url}) => {
  console.log(`Server is ready at ${url}`);
});
