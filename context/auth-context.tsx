"use client";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<boolean>;

  register: (name: string, email: string, password: string) => Promise<boolean>;

  isAuthenticated: boolean;

  user: string | null;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<boolean> => {
    try {
      // Realizar la solicitud a la API
      const response = await fetch(
        "https://fundacite-backend-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        console.error("Error en la autenticación:", response.statusText);
        return Promise.resolve(false);
      }

      const data = await response.json();
      const { token, user } = data;
      console.log(token, user);

      // Guardar el token y los datos del usuario
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      router.push("/dashboard");

      return Promise.resolve(true);
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        "https://fundacite-backend-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!response.ok) {
        console.error("Error en el registro:", response.statusText);
        return Promise.resolve(false);
      }

      toast({
        title: "Registro exitoso",
        description: "Por favor, inicia sesión para continuar.",
        duration: 3000,
      });

      router.push("/login");

      return Promise.resolve(true);
    } catch (error) {
      console.error("Error en el registro:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, logout, user, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
