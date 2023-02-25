import React from "react";
import styles from "../styles/Header.module.css";

type Props = { text: string; style?: string };

const Header = ({ text }: Props) => {
  return (
    <header className={styles["header"]}>
      <h1>{text}</h1>
    </header>
  );
};

export default Header;
