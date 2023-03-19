import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/NextPrevious.module.scss";

type Props = {
  current: string;
};

const NextPrevious = ({ current }: Props) => {
  const router = useRouter();
  const currentPage: number = parseInt(current);

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(
        `/search/movies?searchText=dog&pageNumber=${currentPage - 1}`
      );
    }
  };
  const handleNext = () => {
    router.push(`/search/movies?searchText=dog&pageNumber=${currentPage + 1}`);
  };
  return (
    <div className={styles["pagination"]}>
      <button
        onClick={() => {
          handlePrevious();
        }}
      >
        ❮
      </button>
      <button
        onClick={() => {
          handleNext();
        }}
      >
        ❯
      </button>
    </div>
  );
};

export default NextPrevious;
