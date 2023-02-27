import Header from "@/components/Header";
import { useSearchText } from "@/context/SearchTextContext";
import React from "react";

type Props = {};

const MovieHome = (props: Props) => {
  const { searchText, newSearch } = useSearchText();
  return (
    <>
      <Header text="Movies home" />
    </>
  );
};

export default MovieHome;
