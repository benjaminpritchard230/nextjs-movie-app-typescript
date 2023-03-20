import { useSearchText } from "@/context/SearchTextContext";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/NextPrevious.module.scss";

type Props = {
  current: string;
  category: string;
  totalPages: number;
};

const NextPrevious = ({ current = "1", category, totalPages }: Props) => {
  const router = useRouter();
  const { searchText, newSearch } = useSearchText();

  const currentPage: number = parseInt(current);

  const handleFirst = () => {
    if (currentPage != 1) {
      router.push(
        `/search/${category}?searchText=${searchText}&pageNumber=${1}`
      );
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(
        `/search/${category}?searchText=${searchText}&pageNumber=${
          currentPage - 1
        }`
      );
    }
  };
  const handleNext = () => {
    if (currentPage != totalPages) {
      router.push(
        `/search/${category}?searchText=${searchText}&pageNumber=${
          currentPage + 1
        }`
      );
    }
  };

  const handleLast = () => {
    if (currentPage != totalPages) {
      router.push(
        `/search/${category}?searchText=${searchText}&pageNumber=${totalPages}`
      );
    }
  };
  return (
    <div className={styles["pagination"]}>
      <button
        onClick={() => {
          handleFirst();
        }}
      >
        ❮❮
      </button>
      <button
        onClick={() => {
          handlePrevious();
        }}
      >
        ❮
      </button>
      <p>
        Page {current} of {totalPages}
      </p>
      <button
        onClick={() => {
          handleNext();
        }}
      >
        ❯
      </button>
      <button
        onClick={() => {
          handleLast();
        }}
      >
        ❯❯
      </button>
    </div>
  );
};

export default NextPrevious;
