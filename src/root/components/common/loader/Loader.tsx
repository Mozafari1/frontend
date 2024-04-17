import React from "react";
import "./Loader.scss"; // Import your CSS/SCSS file for styling

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
