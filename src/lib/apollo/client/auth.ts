import { gql } from "@apollo/client";

const USER_REQUEST = `
  id
  name
  email
	profile_picture
`;

export const VERIFY_USER = gql`
  mutation VerifyUser {
    verifyUser {
			${USER_REQUEST}
    }
  }
`;
