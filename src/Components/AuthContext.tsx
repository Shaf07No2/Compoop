import React, { useState, createContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setAuth: (boolean: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, setAuth }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
