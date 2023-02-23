import Layout from "@/components/Layout";
import styles from "@/styles/HomePage.module.css";
import { dividerClasses } from "@mui/material";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const HomePage = () => {
  return (
    <>
      <div className={styles["parent"]}>
        <div className={styles["item1"]}>
          <div className={styles["search"]}>
            <h2>Search now for movies, TV shows or people...</h2>
            <div className={styles["input-container"]}>
              <input type="text" />
              <button>Search</button>
            </div>
          </div>
        </div>
        <div className={styles["item2"]}>
          <h2>Popular movies</h2>
        </div>
        <div className={styles["item3"]}>
          <h2>Popular TV shows</h2>
        </div>
        <div className={styles["item4"]}>
          <h2>Popular people</h2>
        </div>
      </div>
    </>
  );
};

export default HomePage;
