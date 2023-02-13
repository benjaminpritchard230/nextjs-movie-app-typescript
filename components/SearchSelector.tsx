import React from "react";
import styles from "../styles/SearchSelector.module.css";

type Props = {};

const SearchSelector = ({}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button
          className={styles.btn}
          onClick={() => {
            console.log("clicked");
          }}
        >
          Movies
        </button>
      </div>
      <div className={styles.item}>
        <button className={styles.btn}>TV Shows</button>
      </div>
      <div className={styles.item}>
        <button className={styles.btn}>People</button>
      </div>
    </div>
  );
};

export default SearchSelector;
