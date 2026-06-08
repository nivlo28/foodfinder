import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserData = {
  email: string;
  name: string;
  phone: string;
};

type AuthContextType = {
  user: UserData | null;
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string, phone: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (email: string) => {
    setUser(prev => prev ? prev : { email, name: "", phone: "" });
    AsyncStorage.setItem("user", email);
  };

  const register = (name: string, email: string, phone: string) => {
    const userData = { name, email, phone };
    setUser(userData);
    AsyncStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};