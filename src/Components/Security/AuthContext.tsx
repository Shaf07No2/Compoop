import React, { useState, createContext, ReactNode } from "react";
import ProfilePicProvider, {
  ProfilePicContext,
} from "../Fixed/ProfilePicProvider";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setAuth: (boolean: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = () => {
    Cookies.remove("auth");

    setIsAuthenticated(false);
  };

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, setAuth, logout }}
      >
        {props.children}
      </AuthContext.Provider>
      {/* <ProfilePicProvider></ProfilePicProvider> */}
    </>
  );
};

export default AuthContextProvider;
