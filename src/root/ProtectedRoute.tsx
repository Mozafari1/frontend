import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getApiUrl from "./components/helper/helper";

interface ProtectedRouteProps {
  children: ReactNode;
  setIsLoggedIn?: (isLoggedIn: boolean) => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  setIsLoggedIn,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${getApiUrl()}/api/validate-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            setIsLoggedIn && setIsLoggedIn(true);
            setIsAuthenticated(true);
          } else {
            setIsLoggedIn && setIsLoggedIn(false);
            setIsAuthenticated(false);
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error validating token:", error);
          setIsLoggedIn && setIsLoggedIn(false);
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } else {
        setIsLoggedIn && setIsLoggedIn(false);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, [setIsLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
