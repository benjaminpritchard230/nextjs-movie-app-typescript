import React from "react";
import styles from "../styles/Header.module.css";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className={styles.header}>
      <h1>Header</h1>
      <p>My supercool header</p>
    </div>
  );
};

export default Header;
