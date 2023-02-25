import Layout from "@/components/Layout";
import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/HomePage.module.css";
import { dividerClasses } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const HomePage = () => {
  const { searchText, newSearch } = useSearchText();

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search/movies?searchText=${searchText}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <>
      <div className={styles["parent"]}>
        <div className={styles["item1"]}>
          <div className={styles["search"]}>
            <h2>Search now for movies, TV shows or people...</h2>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
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
        <Link href="/movies/popular/" className={styles["item2"]}>
          <h2>Popular movies</h2>
        </Link>
        <Link href="/tv-shows/popular/" className={styles["item3"]}>
          <h2>Popular TV shows</h2>
        </Link>
        <Link href="/people/popular/" className={styles["item4"]}>
          <h2>Popular people</h2>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
