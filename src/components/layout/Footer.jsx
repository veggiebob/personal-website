import React from "react";

const Footer = () => {
  return (
    <footer className="border-t-[1px] p-4 border-neutral-200 flex flex-col gap-y-2 items-center text-sm">
      <a href="https://github.com/veggiebob/hosted-website">Website source</a>

      <span>
        {"</>"} by <a href="https://github.com/veggiebob">Andrew</a> and{" "}
        <a href="https://github.com/chrispittman343">Chris</a>
      </span>
    </footer>
  );
};

export default Footer;
