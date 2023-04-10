import CoreCar from "@/components/CoreCar";
import Header from "@/components/Header";
import { useSearchText } from "@/context/SearchTextContext";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/MovieHome.module.scss";
import { IMovie, IResponse } from "@/types/movies/types";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { GetStaticProps } from "next";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

interface Props {
  data: IResponse;
}

const MovieHome = ({ data }: Props) => {
  const { searchText, newSearch } = useSearchText();
  const router = useRouter();
  const myLoader = ({ src }: any) => {
    return src;
  };

  const [error, setError] = useState(false);

  const handleSearch = () => {
    router.push(`/search/movies?searchText=${searchText}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <>
      <Header text="Movies home" />
      <div className={styles["container"]}>
        <div className={styles["item0"]}>
          <div className={styles["search"]}>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className={"input-container"}>
                <input
                  type="search"
                  placeholder="Search for movies"
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
        <div className={styles["item1"]}>
          <div className="local-bootstrap">
            <CCarousel controls>
              {data.results.map((movie) => {
                return (
                  <CCarouselItem key={movie.id}>
                    <CImage
                      style={{ cursor: "pointer" }}
                      className="d-block w-100"
                      src={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`}
                      alt="slide 1"
                      onClick={() => {
                        router.push(`/movies/${movie.id}`);
                      }}
                    />
                  </CCarouselItem>
                );
              })}
            </CCarousel>
          </div>
        </div>
        <Link href="/movies/popular/" className={styles["item2"]}>
          <h2>Popular movies</h2>
        </Link>
        <Link href="/movies/now-playing/" className={styles["item3"]}>
          <h2>Movies now playing</h2>
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
    revalidate: 86400,
  };
};
