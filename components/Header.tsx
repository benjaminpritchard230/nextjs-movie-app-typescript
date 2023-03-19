import React from "react";

type Props = { text: string; style?: string };

const Header = ({ text }: Props) => {
  return (
    <header className="header">
      <h1>{text}</h1>
    </header>
  );
};

export default Header;
