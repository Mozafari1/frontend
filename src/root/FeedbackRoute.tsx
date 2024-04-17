import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getApiUrl from "./components/helper/helper";

interface FeedbackRouteProps {
  children: ReactNode;
}

const FeedbackRoute: React.FC<FeedbackRouteProps> = ({ children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = window.location.href;
    if (!url) {
      setIsLoading(false);
      return;
    }

    fetch(`${getApiUrl()}/api/validate-feedback-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${url}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setHasPermission(true);
        }
        setIsLoading(false); // Move setIsLoading here
      })
      .catch((error) => {
        console.error("Error validating feedback token:", error);
        setIsLoading(false); // Move setIsLoading here
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasPermission) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default FeedbackRoute;
