import { gql } from "@apollo/client";

const UPDATE_TASK_REQUEST = `
		id
		title
		description
		status
		priority
		labels
`;

export const UPDATE_TASK_STATUS = gql`
  mutation updateTaskStatus($id: ID!, $status: String) {
    updateTask(id: $id, status: $status) {
			${UPDATE_TASK_REQUEST}
    }
  }
`;

export const UPDATE_TASK_PRIORITY = gql`
  mutation updateTaskPriority($id: ID!, $priority: String) {
    updateTask(id: $id, priority: $priority) {
			${UPDATE_TASK_REQUEST}
    }
  }
`;

export const UPDATE_TASK_LABELS = gql`
  mutation updateTaskLabels($id: ID!, $labels: [String]) {
    updateTask(id: $id, labels: $labels) {
			${UPDATE_TASK_REQUEST}
    }
  }
`;
