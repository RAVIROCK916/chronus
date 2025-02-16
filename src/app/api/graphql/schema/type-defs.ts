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

  type Project {
    id: ID!
    user_id: ID!
    name: String!
    description: String!
    created_at: String!
  }

  type Task {
    id: ID!
    project_id: ID!
    user_id: ID!
    name: String!
    description: String!
    created_at: String!
  }

  type Query {
    hello: String
    users: [User]
    projects: [Project]
    tasks: [Task]
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    updateNameOfUser(id: ID!, name: String!): User
    verifySession(sessionId: String!): Boolean
    createProject(name: String!, description: String): Project
  }
`;
