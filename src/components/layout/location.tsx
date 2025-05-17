import React from "react";

const LocationNotice: React.FC = () => (
  <div className="location-notice">
    <i className="fas fa-map-marker-alt location-icon"></i>
    <p>
      <strong>Atenção!</strong> É importante que o localizador do seu celular
      esteja ativado.
    </p>
  </div>
);

export default LocationNotice;
