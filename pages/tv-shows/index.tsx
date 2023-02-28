import Header from "@/components/Header";
import styles from "@/styles/TvHome.module.css";
import React from "react";

type Props = {};

const TvShowHome = (props: Props) => {
  return (
    <>
      <Header text="TV Shows home" />
      <div className={styles["parent"]}>
        <div className={styles["item0"]}>
          <div className={styles["search"]}>
            <h2>Search now for movies, TV shows or people...</h2>
            <div className={styles["input-container"]}>
              <input type="text" />
              <button>Search</button>
            </div>
          </div>
        </div>
        <div className={styles["item1"]}>
          <h2>Bullet points</h2>
        </div>
        <div className={styles["item2"]}>
          <h2>Popular</h2>
        </div>
        <div className={styles["item3"]}>
          <h2>Airing today</h2>
        </div>
        <div className={styles["item4"]}>
          <h2>On TV</h2>
        </div>
        <div className={styles["item5"]}>
          <h2>Top rated</h2>
        </div>
      </div>
    </>
  );
};

export default TvShowHome;
