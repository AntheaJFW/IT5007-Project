import { createContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../services/client';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  const clearUserData = () => {
    localStorage.removeItem('userToken');
    setCurrentUser({});
  };

  const logout = useCallback(() => {
    clearUserData();
    navigate('/login');
  }, [navigate]);

  const login = useCallback((username, password) => {
    return client.post('/api/v1/auth', { username, password });
  }, []);

  const setCurrentUserCallback = useCallback((user) => {
    setCurrentUser(user);
  }, []);

  const userContextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUserCallback,
      login,
      logout,
    }),
    [currentUser, login, setCurrentUserCallback, logout]
  );

  return (
    <AuthContext.Provider value={userContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
