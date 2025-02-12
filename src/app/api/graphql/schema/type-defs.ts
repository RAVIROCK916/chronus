import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password_hash: String!
    created_at: String!
  }

  type Session {
    id: ID!
    user_id: ID!
    expires_at: String!
    created_at: String!
  }

  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    updateNameOfUser(id: ID!, name: String!): User
  }
`;
