import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: String!
    google_id: String
    name: String!
    email: String!
    password_hash: String!
    profile_picture: String
    created_at: String!
    projects: [Project]
    events: [Event]
  }

  type Session {
    id: ID!
    user_id: ID!
    expires_at: String!
    created_at: String!
  }

  type Project {
    id: ID!
    name: String!
    summary: String
    description: String
    color: String
    picture: String
    created_at: String!
    updated_at: String!
    user: User!
    tasks: [Task]!
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
    due_date: String
    comments: [TaskComment]
    created_at: String!
    updated_at: String!
    completed_at: String
    project: Project
  }

  type TaskComment {
    id: ID!
    content: String!
    created_at: String!
    user: User!
  }

  type Event {
    id: ID!
    user_id: ID!
    title: String!
    description: String
    start: String!
    end: String!
    allDay: Boolean!
    color: String!
    location: String
    created_at: String!
    updated_at: String!
  }

  type Notification {
    id: ID!
    title: String!
    message: String!
    category: String!
    isRead: Boolean!
    created_at: String!
  }

  type Query {
    hello: String
    user(id: ID!): User
    currentUser: User
    googleUser(googleId: String!): User
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
    createUser(email: String!, password: String!, googleId: String): User
    createGoogleUser(
      googleId: String!
      name: String!
      email: String!
      profilePicture: String
    ): User
    updateGoogleUser(
      googleId: String!
      name: String!
      email: String!
      profilePicture: String
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
    createProject(name: String!, description: String): Project
    deleteProject(id: ID!): Project
    createTask(
      title: String!
      description: String
      status: String
      priority: String
      dueDate: String
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
    ): Task
    deleteTask(id: ID!): Task
    deleteTasks(ids: [ID!]!): [Task]
    createEvent(
      title: String!
      description: String
      start: String!
      end: String!
      allDay: Boolean!
      color: String!
      location: String
    ): Event
    updateEvent(
      id: ID!
      title: String
      description: String
      start: String
      end: String
      allDay: Boolean
      color: String
      location: String
    ): Event
    deleteEvent(id: ID!): Event
    createNotification(
      title: String!
      message: String!
      category: String!
      isRead: Boolean!
    ): Notification
    updateNotification(
      id: ID!
      title: String
      message: String
      category: String
      isRead: Boolean
    ): Notification
    deleteNotification(id: ID!): Notification
  }
`;
