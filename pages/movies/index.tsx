import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import { useSearchText } from "@/context/SearchTextContext";
import styles from "@/styles/MovieHome.module.css";
import { IMovie, IResponse } from "@/types/movies/types";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: IResponse;
}

const MovieHome = ({ data }: Props) => {
  const { searchText, newSearch } = useSearchText();
  const router = useRouter();

  return (
    <>
      <Header text="Movies home" />
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
          {data.results.slice(0, 1).map((movie: IMovie) => {
            return (
              <ImageCard
                key={movie.id}
                title={movie.title}
                image={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`}
                link={`/movies/${movie.id}/`}
              />
            );
          })}
        </div>
        <Link href="/movies/popular/" className={styles["item2"]}>
          <h2>Popular movies</h2>
        </Link>
        <Link href="/movies/now-playing/" className={styles["item3"]}>
          <h2>Movies now plying</h2>
        </Link>
        <Link href="/movies/upcoming/" className={styles["item4"]}>
          <h2>Upcoming movies</h2>
        </Link>
        <Link href="/movies/top-rated" className={styles["item5"]}>
          <h2>Top rated movies</h2>
        </Link>
      </div>
    </>
  );
};

export default MovieHome;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
