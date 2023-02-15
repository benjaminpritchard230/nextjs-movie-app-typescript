import { useSearchText } from "@/context/SearchTextContext";
import React from "react";

type Props = {};

const MovieHome = (props: Props) => {
  const { searchText, newSearch } = useSearchText();
  return (
    <>
      <h1>movie home</h1>
      <h2>{searchText}</h2>
      <button
        onClick={() => {
          newSearch("benjaminalfredpriotcahrd");
        }}
      >
        click
      </button>
    </>
  );
};

export default MovieHome;
