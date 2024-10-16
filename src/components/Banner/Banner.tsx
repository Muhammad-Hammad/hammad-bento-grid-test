import React from "react";
import "./Banner.css";

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div>
        <h1>Welcome to Banner</h1>
        <p>Your trusted partner in sub description</p>
      </div>
      <div>
        <div className="icon">
          <img src="/assets/question-icon.png" height={25} width={23} />
          <div>Reload</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
