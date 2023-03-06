import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { ICreditsResponse } from "@/types/movieCredits/types";
import type { IMovie, IMovieDetails, IResponse } from "@/types/movies/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  movieData: IMovieDetails;
  castData: ICreditsResponse;
};

const MovieDetail = ({ movieData, castData }: Props) => {
  const router = useRouter();
  const movieId = router.query.movieId;

  const getRunTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const myLoader = ({ src }: any) => {
    return src;
  };

  const [error, setError] = useState(false);

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src={
          !error
            ? `https://www.themoviedb.org/t/p/w1280/${movieData.poster_path}`
            : placeholder
        }
        alt={`${movieData.title}`}
        width={400}
        height={600}
        className={styles["img"]}
        onError={() => {
          setError(true);
        }}
        unoptimized
        priority
      />
    );
  };
  return (
    <>
      <Header text={movieData.title} />
      <div className={styles["parent"]}>
        <div className={styles["item1"]}>
          <MyImage />
        </div>
        <div className={styles["item2"]}>
          <ul>
            <li>
              <p>Release date: {movieData.release_date}</p>
              <br />
              {movieData.budget ? (
                <>
                  <p>Budget: ${movieData.budget}</p> <br />
                </>
              ) : null}

              {movieData.revenue ? (
                <>
                  <p>Revenue: ${movieData.revenue}</p>
                  <br />
                </>
              ) : null}
              <p>Runtime: {getRunTime(movieData.runtime)}</p>
              <br />
              <p>Production companies:</p>
              <ul>
                {movieData.production_companies.map((company) => {
                  return <li key={company.id}>{company.name}</li>;
                })}
              </ul>
              <br />
              <p>Genres: </p>
              <ul>
                {movieData.genres.map((genre) => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles["item3"]}>
          <p>{movieData.overview}</p>
        </div>
        <div className={styles["item4"]}>
          <p>Popularity rating: {movieData.popularity}</p>
        </div>
        {castData.cast.slice(0, 3).map((cast, index) => {
          return (
            <>
              <Link
                href={`/people/${cast.id}/`}
                className={styles[`item${index + 5}`]}
              >
                <Image
                  loader={myLoader}
                  src={
                    !error
                      ? `https://www.themoviedb.org/t/p/w1280/${cast.profile_path}`
                      : placeholder
                  }
                  alt={`${movieData.title}`}
                  width={400}
                  height={600}
                  className={styles["img"]}
                  onError={() => {
                    setError(true);
                  }}
                  unoptimized
                  priority
                />
                <p>{cast.name}</p>
              </Link>
            </>
          );
        })}
        <Link
          href={`/movies/${movieData.id}/cast?title=${movieData.title}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
          className={styles["item8"]}
        >
          <div>
            <p>See all cast and crew</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = process.env.DB_KEY;
  const responsesJSON = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&region=gb`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1&region=gb`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1&region=gb`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1&region=gb`
    ),
  ]);
  const [popularData, nowPlayingData, topRatedData, upcomingData]: IResponse[] =
    await Promise.all(responsesJSON.map((response) => response.json()));

  const paths = popularData.results
    .map((movie: IMovie) => ({
      params: { movieId: `${movie.id}` },
    }))
    .concat(
      nowPlayingData.results.map((movie: IMovie) => ({
        params: { movieId: `${movie.id}` },
      })),
      topRatedData.results.map((movie: IMovie) => ({
        params: { movieId: `${movie.id}` },
      })),
      upcomingData.results.map((movie: IMovie) => ({
        params: { movieId: `${movie.id}` },
      }))
    );
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  {
    const { params } = context;

    const [movieResponse, castResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${
          params!.movieId
        }?api_key=${key}&language=en-US/`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${
          params!.movieId
        }/credits?api_key=${key}&language=en-US`
      ),
    ]);
    const movieData = await movieResponse.json();
    const castData = await castResponse.json();

    return {
      props: {
        movieData,
        castData,
      },
    };
  }
};
