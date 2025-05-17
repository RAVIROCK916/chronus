import { SERVER_URL } from "@/constants";

const USER_REQUEST = `
	id
	google_id
	name
	email
	profile_picture
`;

export const getGoogleUserFromDB = async (id: string) => {
  const {
    data: { googleUser },
  } = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
					query($id: String!) {
						googleUser(google_id: $id) {
								${USER_REQUEST}
							}
						}
					`,
      variables: {
        id,
      },
    }),
  }).then((res) => res.json());

  return googleUser;
};

export const createGoogleUser = async (
  google_id: string,
  name: string,
  email: string,
  profile_picture?: string,
) => {
  const {
    data: { createGoogleUser: createdGoogleUser },
  } = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
					mutation($google_id: String!, $name: String!, $email: String!, $profile_picture: String) {
						createGoogleUser(google_id: $google_id, name: $name, email: $email, profile_picture: $profile_picture) {
							${USER_REQUEST}
						}
					}
				`,
      variables: {
        google_id,
        name,
        email,
        profile_picture,
      },
    }),
  }).then((res) => res.json());

  return createdGoogleUser;
};

export const updateGoogleUser = async (
  id: string,
  name: string,
  email: string,
  profile_picture?: string,
) => {
  const {
    data: { updateGoogleUser: updatedGoogleUser },
  } = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
					mutation ($google_id: String!, $name: String!, $email: String!, $profile_picture: String) {
						updateGoogleUser(google_id: $google_id, name: $name, email: $email, profile_picture: $profile_picture) {
							${USER_REQUEST}
						}
					}
				`,
      variables: {
        google_id: id,
        name,
        email,
        profile_picture,
      },
    }),
  }).then((res) => res.json());

  return updatedGoogleUser;
};
