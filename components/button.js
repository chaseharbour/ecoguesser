import React, { useState } from "react";

const Button = ({ label = "Button", onClick = undefined, isActive = true }) => {
  const [active, setActive] = useState(isActive);
  return (
    <button disabled={isActive} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
