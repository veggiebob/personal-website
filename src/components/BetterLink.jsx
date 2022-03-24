import React from "react";
import { Link } from "react-router-dom";

const BetterLink = (props) => {
  return props.external || !props.to.startsWith('/') ? (
    <a href={props.to} {...props}></a>
  ) : (
    <Link {...props}></Link>
  );
};

export default BetterLink;
