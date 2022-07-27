import { gql } from 'apollo-server';

export default gql`
  type Recipe {
    id: ID!
    title: String!
    description: String
  }

  extend type Query {
    recipes: [Recipe],
    recipe(id: ID!): Recipe
  }
`;
