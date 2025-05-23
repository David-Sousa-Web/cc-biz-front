import React from "react";
import "../../styles/Shared.css";

import logoCoca from '../../assets/images/coca-cola-logo.png'

const Logo: React.FC = () => (
  <div className="logo-container">
    <img
      src={logoCoca}
      alt="Coca-Cola"
      className="logo-image"
    />
  </div>
);
//200x80
export default Logo;
