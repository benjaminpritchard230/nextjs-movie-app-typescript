import React from "react";
import styles from "../styles/Header.module.css";

type Props = { text: string };

const Header = ({ text }: Props) => {
  return (
    <div className={styles.header}>
      <h1>{text}</h1>
    </div>
  );
};

export default Header;
