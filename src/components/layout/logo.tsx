import React from "react";
import "../../styles/Shared.css";

const Logo: React.FC = () => (
  <div className="logo-container">
    <img
      src="https://readdy.ai/api/search-image?query=Coca%20Cola%20logo%20on%20transparent%20background%2C%20high%20quality%2C%20vector%20style%2C%20red%20color%2C%20professional%20brand%20logo%2C%20minimalist%20design%2C%20clean%20lines&width=200&height=80&seq=1&orientation=landscape"
      alt="Coca-Cola"
      className="logo-image"
    />
  </div>
);

export default Logo;
