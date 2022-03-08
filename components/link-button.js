import Link from "next/link";
import React from "react";

const LinkButton = ({ location, label }) => {
  return <Link href={location}>{label}</Link>;
};

export default LinkButton;
