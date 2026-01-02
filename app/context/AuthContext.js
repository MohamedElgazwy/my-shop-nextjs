"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email) => {
    const role = email === "admin@gmail.com" ? "admin" : "user";
    const userData = { email, role };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    router.push(role === "admin" ? "/admin" : "/Products");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/StartPage");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
