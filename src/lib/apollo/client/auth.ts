import { gql } from "@apollo/client";

export const VERIFY_SESSION = gql`
  mutation VerifySession {
    verifySession {
      id
      email
      name
    }
  }
`;
