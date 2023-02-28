import Header from "@/components/Header";
import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/MovieHome.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const MovieHome = (props: Props) => {
  const { searchText, newSearch } = useSearchText();
  const router = useRouter();
  return (
    <>
      <Header text="Movies home" />
      <div className={styles["parent"]}>
        <div className={styles["item0"]}>
          <div className={styles["search"]}>
            <form
              onSubmit={(e) => {
                // handleSubmit(e);
              }}
            >
              <div className={styles["input-container"]}>
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => {
                    newSearch(e.target.value);
                  }}
                />
                <button type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles["item1"]}>
          <h2>Bullet points</h2>
        </div>
        <Link href="/movies/popular/" className={styles["item2"]}>
          <h2>Popular movies</h2>
        </Link>
        <Link href="/movies/now-playing/" className={styles["item3"]}>
          <h2>Movies now playing</h2>
        </Link>
        <Link href="/movies/upcoming/" className={styles["item4"]}>
          <h2>Upcoming movies</h2>
        </Link>
        <Link href="/movies/top-rated" className={styles["item5"]}>
          <h2>Top rated movies</h2>
        </Link>
      </div>
    </>
  );
};

export default MovieHome;
