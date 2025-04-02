import { gql } from "@apollo/client";

const PROJECT_REQUEST = `
	id
	name
	description
	created_at
	tasks {
		id
		title
		description
		status
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
