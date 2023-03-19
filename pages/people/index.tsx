import Header from "@/components/Header";
import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/PeopleHome.module.scss";
import { IResponse } from "@/types/people/types";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: IResponse;
}

const PeopleHome = ({ data }: Props) => {
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
      <Header text="People home" />
      <div className={styles["container"]}>
        <div className={styles["item0"]}>
          <div className="local-bootstrap">
            <CCarousel controls>
              {data.results.map((people) => {
                return (
                  <CCarouselItem key={people.id}>
                    <CImage
                      style={{ cursor: "pointer" }}
                      className="d-block w-100"
                      src={`https://www.themoviedb.org/t/p/w500/${people.profile_path}`}
                      alt="slide 1"
                      onClick={() => {
                        router.push(`/people/${people.id}`);
                      }}
                    />
                  </CCarouselItem>
                );
              })}
            </CCarousel>
          </div>
        </div>

        <div className={styles["item1"]}>
          <div className={styles["search"]}>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className={"input-container"}>
                <input
                  type="search"
                  placeholder="Search for people"
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => {
                    newSearch(e.target.value);
                  }}
                />
                <button className="button" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <Link href="/people/popular/" className={styles["item2"]}>
          <h2>Popular people</h2>
        </Link>
      </div>
    </>
  );
};

export default PeopleHome;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
