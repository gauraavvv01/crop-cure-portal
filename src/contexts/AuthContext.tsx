
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("cropCureUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Mock sign in with Google
  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      // In a real app, this would call a real Google Auth API
      // For now, let's simulate a successful login with mock data
      const mockUser: AuthUser = {
        id: "user123",
        name: "Test User",
        email: "test@example.com",
        photoURL: "https://ui-avatars.com/api/?name=Test+User&background=22c55e&color=fff",
      };
      
      setUser(mockUser);
      localStorage.setItem("cropCureUser", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      // In a real app, this would call a real sign out API
      setUser(null);
      localStorage.removeItem("cropCureUser");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
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
