import Header from "@/components/Header";
import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/TvHome.module.css";
import { IResponse } from "@/types/tv-shows/types";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: IResponse;
}

const TvShowHome = ({ data }: Props) => {
  const { searchText, newSearch } = useSearchText();
  const router = useRouter();

  return (
    <>
      <Header text="TV Shows home" />
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
          <div className="local-bootstrap">
            <CCarousel controls>
              {data.results.map((movie) => {
                return (
                  <CCarouselItem key={movie.id}>
                    <CImage
                      className="d-block w-100"
                      src={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`}
                      alt="slide 1"
                    />
                  </CCarouselItem>
                );
              })}
            </CCarousel>
          </div>
        </div>
        <Link href="/tv-shows/popular/" className={styles["item2"]}>
          <h2>Popular</h2>
        </Link>

        <Link href="/tv-shows/airing-today/" className={styles["item3"]}>
          <h2>Airing today</h2>
        </Link>
        <Link href="/tv-shows/on-tv/" className={styles["item4"]}>
          <h2>On TV</h2>
        </Link>
        <Link href="/tv-shows/top-rated/" className={styles["item5"]}>
          <h2>Top rated</h2>
        </Link>
      </div>
    </>
  );
};

export default TvShowHome;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
