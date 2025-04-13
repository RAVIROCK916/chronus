import { gql } from "@apollo/client";

export const GET_DASHBOARD_QUERY = gql`
  query Dashboard {
    projects {
      id
      name
      description
      tasks {
        id
        title
        description
        status
        priority
        labels
        due_date
        created_at
				updated_at
				completed_at
      }
    }
    lastWeekTasks {
      id
      title
      description
      status
      priority
      labels
      due_date
      created_at
      updated_at
    }
    events {
      id
      title
      description
      start
      end
      allDay
      color
      location
      created_at
    }
  }
`;
