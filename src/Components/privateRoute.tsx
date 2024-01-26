import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "./AuthContext";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useContext(AuthContext) is undefined, did you forget to wrap your component in <AuthContext.Provider>?"
    );
  }

  const { isAuthenticated } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        // isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
