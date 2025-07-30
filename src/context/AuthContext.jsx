import { createContext, useContext, useState, useEffect } from 'react';
import { useSupabaseAuth } from '../auth/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { getUserInfo } = useSupabaseAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo();
      if (userData) {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
      } else {
        localStorage.removeItem('userInfo');
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
