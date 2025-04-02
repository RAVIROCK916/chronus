import { gql } from "@apollo/client";

const TASK_REQUEST = `
		id
		title
		description
		status
		priority
		labels
		project {
		  name
		}
`;

export const GET_TASK = gql`
		query getTask($id: ID!) {
					task(id: $id) {
						${TASK_REQUEST}
			}
		}
	`;

export const UPDATE_TASK_STATUS = gql`
  mutation updateTaskStatus($id: ID!, $status: String) {
    updateTask(id: $id, status: $status) {
			${TASK_REQUEST}
    }
  }
`;

export const UPDATE_TASK_PRIORITY = gql`
  mutation updateTaskPriority($id: ID!, $priority: String) {
    updateTask(id: $id, priority: $priority) {
			${TASK_REQUEST}
    }
  }
`;

export const UPDATE_TASK_LABELS = gql`
  mutation updateTaskLabels($id: ID!, $labels: [String]) {
    updateTask(id: $id, labels: $labels) {
			${TASK_REQUEST}
    }
  }
`;
