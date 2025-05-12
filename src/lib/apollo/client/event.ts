import { gql } from "@apollo/client";

const EVENT_REQUEST = `
	id
	title
	description
	start
	end
	all_day
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
	mutation createEvent($title: String!, $description: String, $start: String!, $end: String!, $all_day: Boolean!, $color: String!, $location: String) {
		createEvent(title: $title, description: $description, start: $start, end: $end, all_day: $all_day, color: $color, location: $location) {
			${EVENT_REQUEST}
		}
	}
`;

export const UPDATE_EVENT = gql`
	mutation updateEvent($id: ID!, $title: String, $description: String, $start: String, $end: String, $all_day: Boolean, $color: String, $location: String) {
		updateEvent(id: $id, title: $title, description: $description, start: $start, end: $end, all_day: $all_day, color: $color, location: $location) {
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
