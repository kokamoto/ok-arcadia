import { ApolloServer, gql } from 'apollo-server';
import merge from 'lodash/merge.js';
import recipeTypeDefs from './typeDefs/recipeTypeDefs.js';
import recipeResolvers from './resolvers/recipeResolvers.js';
import { RecipeDataSource } from './dataSources/recipeDataSource.js';

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

const recipes = [{
  id: '001',
  title: 'Gluten-free Chocolate Chip Cookies',
  description: 'Warm gluten-free chocolate chip cookies are yummy.'
}, {
  id: '002',
  title: 'Chicken Soup',
  description: 'Soup for your soul.'
}, {
  id: '003',
  title: 'Thai Lettuce Wraps',
  description: 'Simple and healthy.'
}];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  dataSources: () => {
    return {
      recipeDataSource: new RecipeDataSource(recipes)
    };
  }
});

server.listen().then(({url}) => {
  console.log(`Server is ready at ${url}`);
});
