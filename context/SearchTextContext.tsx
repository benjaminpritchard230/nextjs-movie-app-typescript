import { createContext, ReactNode, useContext, useState } from "react";

export interface ISearchText {
  searchText: string;
  newSearch: (text: string) => void;
}

const searchTextContextDefaultValues: ISearchText = {
  searchText: "",
  newSearch: () => {},
};

const SearchTextContext = createContext<ISearchText>(
  searchTextContextDefaultValues
);

export const useSearchText = () => {
  return useContext(SearchTextContext);
};

type Props = {
  children: ReactNode;
  newSearch: (text: string) => {};
};

export const SearchTextProvider = ({ children }: Props) => {
  const [searchText, setSearchText] = useState("benjamin");

  const newSearch = (text: string) => {
    setSearchText(text);
  };

  const value = {
    searchText,
    newSearch,
  };
  return (
    <>
      <SearchTextContext.Provider value={value}>
        {children}
      </SearchTextContext.Provider>
    </>
  );
};
