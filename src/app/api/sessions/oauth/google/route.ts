import { SERVER_URL } from "@/constants";
import { createSession } from "@/lib/session";
import {
  getGoogleOAuthToken,
  getGoogleUserWithToken,
  upsertGoogleUser,
} from "@/utils/google-oauth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // get code from query params

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code not found" },
        { status: 400 },
      );
    }

    // get access token from google api using code

    const { id_token, access_token } = await getGoogleOAuthToken(code);

    // get user info from google api using access token

    const googleUser = await getGoogleUserWithToken(id_token, access_token);

    // update or create user in database

    const user = await upsertGoogleUser(googleUser);

    // create session in database

    await createSession(user.id);

    // redirect to client url

    return NextResponse.redirect(`${process.env.CLIENT_URL}`);
    // return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("error", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
