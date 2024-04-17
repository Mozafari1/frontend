import React from "react";
import "./Error.scss"; // Import your CSS/SCSS file for styling

const ErrorPage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="error-page">
      <h1>Oops! An Error Occurred</h1>
      <p>{message}</p>
      <p>Please try again later or contact support.</p>
    </div>
  );
};

export default ErrorPage;
