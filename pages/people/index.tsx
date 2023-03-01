import Header from "@/components/Header";
import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/PeopleHome.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const PeopleHome = (props: Props) => {
  const { searchText, newSearch } = useSearchText();
  const router = useRouter();
  return (
    <>
      <Header text="People home" />
      <div className={styles["parent"]}>
        <div className={styles["item0"]}>
          <h2>Image</h2>
        </div>

        <div className={styles["item1"]}>
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
        <Link href="/movies/popular/" className={styles["item2"]}>
          <h2>Popular people</h2>
        </Link>
      </div>
    </>
  );
};

export default PeopleHome;
