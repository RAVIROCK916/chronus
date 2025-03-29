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
    description: String
    created_at: String!
  }

  type Folder {
    id: ID!
    project_id: ID!
    user_id: ID!
    name: String!
    description: String!
    created_at: String!
  }

  type Task {
    id: ID!
    project_id: ID!
    user_id: ID!
    title: String!
    description: String!
    status: String!
    priority: String!
    labels: [String]
    created_at: String!
  }

  type Query {
    hello: String
    users: [User]
    projects: [Project]
    tasks(projectId: ID!): [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
    updateNameOfUser(id: ID!, name: String!): User
    verifySession: Boolean
    createProject(name: String!, description: String): Project
    deleteProject(id: ID!): Project
    addTask(
      title: String!
      description: String
      status: String
      projectId: ID!
    ): Task
    updateTask(
      id: ID!
      title: String
      description: String
      status: String
      priority: String
      labels: [String]
    ): Task
  }
`;
