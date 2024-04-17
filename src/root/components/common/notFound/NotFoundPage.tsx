import React from "react";
import "./NotFoundPage.scss"; // Import your CSS/SCSS file for styling

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>
        Return to <a href="/">Home</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
