"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
