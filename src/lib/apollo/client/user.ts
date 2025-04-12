import { gql } from "@apollo/client";

const USER_REQUEST = `
	id
	name
	email
	profile_picture
`;

export const GET_USER = gql`
	query getUser {
    currentUser {
			${USER_REQUEST}
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
			${USER_REQUEST}
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String, $email: String, $password_hash: String, $profile_picture: String) {
    updateUser(id: $id, name: $name, email: $email, password_hash: $password_hash, profile_picture: $profile_picture) {
			${USER_REQUEST}
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
