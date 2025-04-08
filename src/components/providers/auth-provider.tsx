"use client";
import { VERIFY_SESSION } from "@/lib/apollo/client/auth";
import { User } from "@/types";
import { useMutation } from "@apollo/client";
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
  const [verifySession] = useMutation(VERIFY_SESSION);

  useEffect(() => {
    const fetchUser = async () => {
      await verifySession();
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
