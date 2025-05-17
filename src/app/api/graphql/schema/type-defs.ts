import { gql } from "@apollo/client";

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: String!
    google_id: String
    name: String!
    email: String!
    password_hash: String!
    profile_picture: String
    created_at: DateTime!
    projects: [Project]
    events: [Event]
  }

  type Session {
    id: ID!
    user_id: ID!
    expires_at: DateTime!
    created_at: DateTime!
  }

  type Project {
    id: ID!
    name: String!
    summary: String
    description: String
    color: String!
    due_date: DateTime
    picture: String
    created_at: DateTime!
    updated_at: DateTime!
    user: User!
    tasks: [Task]!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    priority: String!
    labels: [String]
    due_date: DateTime
    comments: [TaskComment]
    created_at: DateTime!
    updated_at: DateTime!
    completed_at: DateTime
    project_id: ID!
    user_id: ID!
    project: Project
  }

  type TaskComment {
    id: ID!
    content: String!
    created_at: DateTime!
    user: User!
  }

  type Event {
    id: ID!
    user_id: ID!
    title: String!
    description: String
    start: String!
    end: String!
    all_day: Boolean!
    color: String!
    location: String
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Notification {
    id: ID!
    title: String!
    message: String!
    category: String!
    is_read: Boolean!
    created_at: DateTime!
  }

  type Query {
    hello: String
    user(id: ID!): User
    currentUser: User
    googleUser(google_id: String!): User
    users: [User]
    projects: [Project]
    project(id: ID!): Project
    tasks(projectId: ID!): [Task]
    task(id: ID!): Task
    lastWeekTasks: [Task]
    events: [Event]
    notifications: [Notification]
  }

  type Mutation {
    getUser(id: ID!): User
    createUser(email: String!, password: String!, google_id: String): User
    createGoogleUser(
      google_id: String!
      name: String!
      email: String!
      profile_picture: String
    ): User
    updateGoogleUser(
      google_id: String!
      name: String!
      email: String!
      profile_picture: String
    ): User
    loginUser(email: String!, password: String!): User
    logoutUser: Boolean
    updateUser(
      id: ID!
      name: String
      email: String
      password_hash: String
      profile_picture: String
    ): User
    deleteUser(id: ID!): User
    verifyUser: User
    createProject(
      name: String!
      summary: String
      description: String
      color: String!
    ): Project
    updateProject(
      id: ID!
      name: String
      summary: String
      description: String
      color: String
      due_date: String
      picture: String
    ): Project
    deleteProject(id: ID!): Project
    deleteProjects(ids: [ID!]!): [Project]
    createTask(
      title: String!
      description: String
      status: String
      priority: String
      due_date: String
      labels: [String]
      projectId: ID!
    ): Task
    updateTask(
      id: ID!
      title: String
      description: String
      status: String
      priority: String
      labels: [String]
      due_date: String
    ): Task
    deleteTask(id: ID!): Task
    deleteTasks(ids: [ID!]!): [Task]
    createEvent(
      title: String!
      description: String
      start: String!
      end: String!
      all_day: Boolean!
      color: String!
      location: String
    ): Event
    updateEvent(
      id: ID!
      title: String
      description: String
      start: String
      end: String
      all_day: Boolean
      color: String
      location: String
    ): Event
    deleteEvent(id: ID!): Event
    createNotification(
      title: String!
      message: String!
      category: String!
      is_read: Boolean!
    ): Notification
    updateNotification(
      id: ID!
      title: String
      message: String
      category: String
      is_read: Boolean
    ): Notification
    deleteNotification(id: ID!): Notification
  }
`;
