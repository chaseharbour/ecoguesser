import Link from "next/link";
import React from "react";

const LinkButton = ({ location, label, asLoc }) => {
  return (
    <Link href={location} as={asLoc}>
      {label}
    </Link>
  );
};

export default LinkButton;
