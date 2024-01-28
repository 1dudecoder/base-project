import React from "react";
import "./CustButton.css"

function CustButton({ icon, text }) {
  return (
    <div className="cust-btn">
      <img src={icon} alt={`${icon}-logo`} />
      <p>{text}</p>
    </div>
  );
}

export default CustButton;
