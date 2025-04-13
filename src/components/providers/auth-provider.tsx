"use client";
import { VERIFY_USER } from "@/lib/apollo/client/auth";
import { setProfile } from "@/state/features/profile/profileSlice";
import store from "@/state/store";
import { User } from "@/types";
import { useMutation } from "@apollo/client";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  user: User;
  isLoggedIn: boolean;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState();
  const [verifyUser] = useMutation(VERIFY_USER);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await verifyUser();
      if (!data.verifyUser) {
        router.push("/login");
      }
      setUser(data.verifyUser);
      store.dispatch(setProfile(data.verifyUser));
    };

    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: true }}>
      {children}
    </AuthContext.Provider>
  );
};
