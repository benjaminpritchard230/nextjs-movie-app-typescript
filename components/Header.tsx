import React from "react";
import styles from "../styles/Header.module.css";

type Props = { text: string; secondaryText?: string; style?: string };

const Header = ({ text, secondaryText, style = "header" }: Props) => {
  return (
    <header className={styles[style]}>
      <h1>{text}</h1>
      <h3>{secondaryText}</h3>
    </header>
  );
};

export default Header;
