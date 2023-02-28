import Header from "@/components/Header";
import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/MovieHome.module.css";
import React from "react";

type Props = {};

const MovieHome = (props: Props) => {
  const { searchText, newSearch } = useSearchText();
  return (
    <>
      <Header text="Movies home" />
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
          <h2>Now playing</h2>
        </div>
        <div className={styles["item4"]}>
          <h2>Upcoming</h2>
        </div>
        <div className={styles["item5"]}>
          <h2>Top rated</h2>
        </div>
      </div>
    </>
  );
};

export default MovieHome;
