import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext not found");

  const { setAuth, isAuthenticated } = authContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwt = Cookies.get("auth");
    if (jwt) {
      setAuth(true);
    }
    setIsLoading(false);
  }, [setAuth]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <div> Loading... </div>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
