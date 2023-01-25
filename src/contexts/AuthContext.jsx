import { createContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const clearUserData = () => {
    localStorage.removeItem('userGlobals');
    setCurrentUser({});
  };

  const logout = useCallback(() => {
    clearUserData();
    navigate('/login');
  }, [navigate]);

  const fetchAPI = useCallback(
    (api, body = null, options = {}, json = true) => {
      var userGlobals;
      const localStorageFlag = Object.keys(currentUser)?.length === 0;
      var userGlobalsToken;

      if (localStorageFlag) {
        userGlobals = localStorage.getItem('userGlobals');
        console.log(userGlobals);
        if (!userGlobals) {
          navigate('/login');
        } else {
          const userGlobalsJson = JSON.parse(userGlobals);
          userGlobalsToken = userGlobalsJson.token;
          setCurrentUser(currentUser);
        }
      }
      if (body && json) {
        try {
          body = JSON.stringify(body);
        } catch (e) {
          throw Error(
            'Error with stringifying json. Please ensure it is valid'
          );
        }
      }
      options = {
        ...options,
        headers: {
          authorization: !localStorageFlag
            ? 'Bearer ' + currentUser.token
            : 'Bearer ' + userGlobalsToken,
          'Content-Type': json ? 'application/json' : '',
        },
        body: body,
      };

      return fetch(api, options)
        .then((response) => {
          if (response.status === 401) {
            clearUserData();
            navigate(
              '/login',
              (options = {
                state: { message: 'Token invalid. Please log in again.' },
              })
            );
          }
          return response;
        })
        .catch((err) => {
          throw Error(`Error fetching resource: ${err}`);
        });
    },
    [currentUser, navigate]
  );

  const login = useCallback((username, password) => {
    return fetch('/api/v1/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success: ' + JSON.stringify(data));
        setCurrentUser({ username, ...data });
        return { status: 'success', message: '', data: { username, ...data } };
      })
      .catch((err) => {
        return { status: 'error', message: err };
      });
  }, []);

  const userContextValue = useMemo(
    () => ({
      currentUser,
      fetchAPI,
      login,
      logout,
    }),
    [currentUser, fetchAPI, login, logout]
  );

  return (
    <AuthContext.Provider value={userContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
