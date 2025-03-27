
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithProvider: (provider: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend
    // This is a mock implementation
    const mockUser = {
      id: "user-123",
      email,
      name: email.split('@')[0],
    };
    
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    navigate("/");
  };

  const loginWithProvider = async (provider: string) => {
    // In a real app, this would integrate with Google/Facebook OAuth
    // This is a mock implementation
    const mockUser = {
      id: `${provider.toLowerCase()}-user-123`,
      email: `user@${provider.toLowerCase()}.com`,
      name: `${provider} User`,
    };
    
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loginWithProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
