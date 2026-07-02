import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: {
    username: string;
    platform: 'java' | 'bedrock';
  } | null;
  login: (username: string, platform: 'java' | 'bedrock') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  useEffect(() => {
    const stored = localStorage.getItem('mc_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const login = (username: string, platform: 'java' | 'bedrock') => {
    const userData = { username, platform };
    setUser(userData);
    localStorage.setItem('mc_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
