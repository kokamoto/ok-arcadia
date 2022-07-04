import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Recipe {
    title: String!
    description: String
  }

  type Query {
    recipes: [Recipe]
  }
`;

const recipes = [{
  title: 'Gluten-free Chocolate Chip Cookies',
  description: 'Warm gluten-free chocolate chip cookies are yummy.'
}, {
  title: 'Chicken Soup',
  description: 'Soup for your soul.'
}];

const resolvers = {
  Query: {
    recipes: () => recipes,
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded'
});

server.listen().then(({url}) => {
  console.log(`Server is ready at ${url}`);
});
