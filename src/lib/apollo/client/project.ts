import { gql } from "@apollo/client";

const PROJECT_REQUEST = `
	id
	name
	description
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
