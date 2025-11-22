import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types/auth';

interface AuthContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, pass: string, profileData: Omit<UserProfile, 'uid' | 'email'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a user session exists in sessionStorage
    const checkCurrentUser = () => {
      try {
        const storedUser = sessionStorage.getItem('userProfile');
        if (storedUser) {
          setUserProfile(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from sessionStorage", error);
        sessionStorage.removeItem('userProfile');
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });

    if (!response.ok) {
      // Try to parse error message from backend, otherwise throw generic error
      const errorData = await response.json().catch(() => ({ message: 'Invalid credentials' }));
      throw new Error(errorData.message);
    }

    const user: UserProfile = await response.json();
    setUserProfile(user);
    sessionStorage.setItem('userProfile', JSON.stringify(user));
  };

  const logout = async (): Promise<void> => {
    // In a real app, you might want to invalidate the session on the server too
    // await fetch('/api/auth/logout', { method: 'POST' });
    setUserProfile(null);
    sessionStorage.removeItem('userProfile');
    return Promise.resolve();
  };
  
  const register = async (email: string, pass: string, profileData: Omit<UserProfile, 'uid' | 'email'>): Promise<void> => {
     const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, ...profileData }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
        throw new Error(errorData.message);
    }
    
    const newUser: UserProfile = await response.json();
    setUserProfile(newUser);
    sessionStorage.setItem('userProfile', JSON.stringify(newUser));
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};