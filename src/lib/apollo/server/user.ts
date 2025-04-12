import { SERVER_URL } from "@/constants";

const USER_REQUEST = `
	id
	google_id
	name
	email
	profile_picture
`;

export const getGoogleUser = async (id: string) => {
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
						googleUser(googleId: $id) {
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
  googleId: string,
  name: string,
  email: string,
  profilePicture?: string,
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
					mutation($googleId: String!, $name: String!, $email: String!, $profilePicture: String) {
						createGoogleUser(googleId: $googleId, name: $name, email: $email, profilePicture: $profilePicture) {
							${USER_REQUEST}
						}
					}
				`,
      variables: {
        googleId,
        name,
        email,
        profilePicture,
      },
    }),
  }).then((res) => res.json());

  return createdGoogleUser;
};

export const updateGoogleUser = async (
  id: string,
  name: string,
  email: string,
  profilePicture?: string,
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
					mutation ($googleId: String!, $name: String!, $email: String!, $profilePicture: String) {
						updateGoogleUser(googleId: $googleId, name: $name, email: $email, profilePicture: $profilePicture) {
							${USER_REQUEST}
						}
					}
				`,
      variables: {
        googleId: id,
        name,
        email,
        profilePicture,
      },
    }),
  }).then((res) => res.json());

  return updatedGoogleUser;
};
