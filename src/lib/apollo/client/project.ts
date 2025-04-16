import { gql } from "@apollo/client";

const PROJECT_REQUEST = `
	id
	name
	description
	picture
	created_at
	user {
		id
		name
		email
	}
	tasks {
		id
		title
		description
		status
		priority
		labels
		due_date
		created_at
	}
`;

export const GET_PROJECT = gql`
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      ${PROJECT_REQUEST}
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      ${PROJECT_REQUEST}
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String) {
    createProject(name: $name, description: $description) {
      ${PROJECT_REQUEST}
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $name: String, $description: String) {
    updateProject(id: $id, name: $name, description: $description) {
      ${PROJECT_REQUEST}
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;
