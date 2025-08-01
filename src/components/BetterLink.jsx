import React from "react";
import { Link } from "react-router-dom";

const ExternalLinkIcon = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const BetterLink = (props) => {
  const isExternal = props.external || !props.to.startsWith('/');
  const { children, external, ...restProps } = props;
  
  const content = (
    <>
      {children}
    </>
  );

  return isExternal ? (
    <a href={props.to} {...restProps}>
      {content}
    </a>
  ) : (
    <Link {...restProps}>
      {content}
    </Link>
  );
};

export { BetterLink, ExternalLinkIcon };
