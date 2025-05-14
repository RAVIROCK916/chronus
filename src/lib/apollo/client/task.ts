import { gql } from "@apollo/client";

const TASK_REQUEST = `
		id
		title
		description
		status
		priority
		labels
		due_date
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

export const CREATE_TASK = gql`
	mutation createTask($title: String!, $description: String, $status: String, $priority: String, $labels: [String], $due_date: String, $projectId: ID!) {
		createTask(title: $title, description: $description, status: $status, priority: $priority, labels: $labels, due_date: $due_date, projectId: $projectId) {
			${TASK_REQUEST}
		}
	}
`;

export const UPDATE_TASK = gql`
	mutation updateTask($id: ID!, $title: String, $description: String, $status: String, $priority: String, $labels: [String], $due_date: String) {
		updateTask(id: $id, title: $title, description: $description, status: $status, priority: $priority, labels: $labels, due_date: $due_date) {
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

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const DELETE_TASKS = gql`
  mutation deleteTasks($taskIds: [ID!]!) {
    deleteTasks(ids: $taskIds) {
      id
    }
  }
`;
