import { GOOGLE_OAUTH_REDIRECT_URL, GOOGLE_CLIENT_ID } from "@/constants/env";
import {
  GOOGLE_OAUTH_TOKEN_URL,
  GOOGLE_OAUTH_URL,
} from "@/constants/google-oauth";
import {
  createGoogleUser,
  getGoogleUser,
  updateGoogleUser,
} from "@/lib/apollo/server/user";

interface GoogleOAuthTokenResult {
  id_token: string;
  access_token: string;
}

export function getGoogleOAuthUrl() {
  const rootUrl = GOOGLE_OAUTH_URL;
  const options = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
  };

  const queryString = new URLSearchParams(options);

  return `${rootUrl}?${queryString}`;
}

export async function getGoogleOAuthToken(
  code: string,
): Promise<GoogleOAuthTokenResult> {
  const rootUrl = GOOGLE_OAUTH_TOKEN_URL;
  const options = {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
    code: code,
  };

  try {
    const data: GoogleOAuthTokenResult = await fetch(rootUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(options),
    }).then((res) => res.json());
    return data;
  } catch (error: any) {
    console.error("error", error);
    throw new Error("Failed to fetch Google OAuth token", error);
  }
}

export async function getGoogleUserWithToken(
  idToken: string,
  accessToken: string,
) {
  try {
    const googleUser = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    ).then((res) => res.json());

    return googleUser;
  } catch (error: any) {
    console.error("error", error);
    throw new Error("Failed to fetch Google user", error);
  }
}

export async function upsertGoogleUser(user: {
  id: string;
  name: string;
  email: string;
  picture?: string;
}) {
  const googleUser = await getGoogleUser(user.id);

  if (googleUser) {
    const updatedGoogleUser = await updateGoogleUser(
      user.id,
      user.name,
      user.email,
      user.picture,
    );
    return updatedGoogleUser;
  }

  const createdGoogleUser = await createGoogleUser(
    user.id,
    user.name,
    user.email,
    user.picture,
  );

  return createdGoogleUser;
}
