import { useSearchText } from "@/context/SearchTextContext";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/SearchSelector.module.scss";

type Props = {
  selected: string;
};

const SearchSelector = ({ selected }: Props) => {
  const router = useRouter();
  const { searchText, newSearch } = useSearchText();

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button
          className={
            selected === "Movies" ? "large-button--selected" : "large-button"
          }
          onClick={() => {
            router.push(`/search/movies?searchText=${searchText}`);
          }}
        >
          Movies
        </button>
      </div>
      <div className={styles.item}>
        <button
          className={
            selected === "TV Shows" ? "large-button--selected" : "large-button"
          }
          onClick={() => {
            router.push(`/search/tv-shows?searchText=${searchText}`);
          }}
        >
          TV Shows
        </button>
      </div>
      <div className={styles.item}>
        <button
          className={
            selected === "People" ? "large-button--selected" : "large-button"
          }
          onClick={() => {
            router.push(`/search/people?searchText=${searchText}`);
          }}
        >
          People
        </button>
      </div>
    </div>
  );
};

export default SearchSelector;
