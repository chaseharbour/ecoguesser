import React from "react";
import LinkButton from "./link-button";

const Header = () => {
  return (
    <div>
      <h2>Header</h2>
      <LinkButton location="/" label="Take me home" />
    </div>
  );
};

export default Header;
