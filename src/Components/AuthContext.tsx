// AuthContext.tsx
import React from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined!
);
