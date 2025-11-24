import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { UserProfile } from "../types/auth";
import { supabase } from "../utils/supabaseClient";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    pass: string,
    profileData: Omit<UserProfile, "uid" | "email">
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Convierte el usuario de Supabase en tu UserProfile del frontend.
 * Usa user_metadata para guardar role, name, companyName, etc.
 */
const mapSupabaseUserToProfile = (user: SupabaseUser): UserProfile => {
  const meta: any = user.user_metadata || {};

  return {
    uid: user.id,
    email: user.email ?? "",
    role: (meta.role as UserProfile["role"]) ?? "visitante",
    name: (meta.name as string) ?? "",
    companyName: (meta.companyName as string) ?? meta.company_name,
    companyLocation:
      (meta.companyLocation as string) ?? meta.company_location,
    website: (meta.website as string) ?? "",
    socialMedia: (meta.socialMedia as string) ?? meta.social_media,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, intenta recuperar la sesión desde Supabase
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!error && data?.user) {
          const profile = mapSupabaseUserToProfile(data.user);
          setUserProfile(profile);
          sessionStorage.setItem("userProfile", JSON.stringify(profile));
          return;
        }

        // Fallback: si por alguna razón Supabase no devuelve user,
        // intenta leer de sessionStorage (por ejemplo, sesión vieja).
        const storedUser = sessionStorage.getItem("userProfile");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser) as UserProfile;
            setUserProfile(parsed);
          } catch (e) {
            console.error("Failed to parse user from sessionStorage", e);
            sessionStorage.removeItem("userProfile");
          }
        }
      } catch (e) {
        console.error("Error initializing auth:", e);
        sessionStorage.removeItem("userProfile");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) {
      throw new Error(error.message || "Credenciales inválidas");
    }

    if (!data.user) {
      throw new Error("No se pudo obtener el usuario después de iniciar sesión");
    }

    const profile = mapSupabaseUserToProfile(data.user);
    setUserProfile(profile);
    sessionStorage.setItem("userProfile", JSON.stringify(profile));
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUserProfile(null);
    sessionStorage.removeItem("userProfile");
  };

  const register = async (
    email: string,
    pass: string,
    profileData: Omit<UserProfile, "uid" | "email">
  ): Promise<void> => {
    // Guardamos la información de perfil en user_metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          role: profileData.role,
          name: profileData.name,
          companyName: profileData.companyName,
          companyLocation: profileData.companyLocation,
          website: profileData.website,
          socialMedia: profileData.socialMedia,
        },
      },
    });

    if (error) {
      throw new Error(error.message || "Error al registrar usuario");
    }

    if (!data.user) {
      throw new Error("No se pudo crear el usuario");
    }

    const newProfile = mapSupabaseUserToProfile(data.user);
    setUserProfile(newProfile);
    sessionStorage.setItem("userProfile", JSON.stringify(newProfile));

    // [Opcional] También podrías insertar en tu tabla public.users aquí,
    // pero eso requiere que la policy de RLS lo permita usando la anon key.
    //
    // await supabase.from("users").insert({
    //   id: data.user.id,
    //   email,
    //   role: profileData.role,
    //   name: profileData.name,
    //   company_name: profileData.companyName,
    //   company_location: profileData.companyLocation,
    //   website: profileData.website,
    //   social_media: profileData.socialMedia,
    // });
  };

  const value = { userProfile, loading, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
