"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import makeClient from "@/lib/apollo";

const VERIFY_SESSION = gql`
  mutation VerifySession {
    verifySession
  }
`;

export default function AuthCheck() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [verifySession] = useMutation(VERIFY_SESSION);
  useEffect(() => {
    const checkAuth = async () => {
      // if (!verifySession) {
      //   router.push("/login");
      // }
      await verifySession();
    };

    checkAuth();
  }, []);

  return null;
}
