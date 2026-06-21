import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../services/supabaseClient";

type UserData = {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl: string;
} | null;

type RegisterResult = {
  success: boolean;
  hasSession: boolean;
};

type AuthContextType = {
  user: UserData;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<RegisterResult>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(null);

  // Construye el objeto de usuario que usa la app a partir de la sesión de Supabase
  const buildUserFromSession = (session: Session | null): UserData => {
    if (!session || !session.user) return null;

    const metadata = session.user.user_metadata || {};
    return {
      id: session.user.id,
      email: session.user.email || "",
      name: metadata.full_name || "",
      phone: metadata.phone || "",
      avatarUrl: metadata.avatar_url || "",
    };
  };

  // Al abrir la app, revisa si ya hay una sesión guardada por Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(buildUserFromSession(data.session));
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setUser(buildUserFromSession(session));
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error al iniciar sesión", error.message);
      return false;
    }

    setUser(buildUserFromSession(data.session));
    return true;
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<RegisterResult> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone,
        },
      },
    });

    if (error) {
      Alert.alert("Error al registrarse", error.message);
      return { success: false, hasSession: false };
    }

    if (data.session) {
      setUser(buildUserFromSession(data.session));
      return { success: true, hasSession: true };
    }

    Alert.alert(
      "Registro exitoso",
      "Revisa tu correo para confirmar tu cuenta antes de iniciar sesión."
    );
    return { success: true, hasSession: false };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Vuelve a leer los datos del usuario desde Supabase (usado después de subir la foto)
  const refreshUser = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(buildUserFromSession(data.session));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};