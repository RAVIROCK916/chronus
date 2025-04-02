import { gql } from "@apollo/client";

const EVENT_REQUEST = `
	id
	title
	description
	start
	end
	allDay
	color
	location
`;

export const GET_EVENTS = gql`
	query getEvents {
		events {
			${EVENT_REQUEST}
		}
	}
`;

export const CREATE_EVENT = gql`
	mutation createEvent($title: String!, $description: String, $start: String!, $end: String!, $allDay: Boolean!, $color: String!, $location: String) {
		createEvent(title: $title, description: $description, start: $start, end: $end, allDay: $allDay, color: $color, location: $location) {
			${EVENT_REQUEST}
		}
	}
`;

export const UPDATE_EVENT = gql`
	mutation updateEvent($id: ID!, $title: String, $description: String, $start: String, $end: String, $allDay: Boolean, $color: String, $location: String) {
		updateEvent(id: $id, title: $title, description: $description, start: $start, end: $end, allDay: $allDay, color: $color, location: $location) {
			${EVENT_REQUEST}
		}
	}
`;

export const DELETE_EVENT = gql`
	mutation deleteEvent($id: ID!) {
		deleteEvent(id: $id) {
			${EVENT_REQUEST}
		}
	}
`;
