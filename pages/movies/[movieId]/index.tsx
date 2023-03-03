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
  console.log(castData);
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
        className={styles.img}
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
      <div className={styles.container}>
        <div className={styles.item}>
          <MyImage />
        </div>
        <div className={styles.item}>
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
                  {" "}
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
        <div className={styles.item}>
          <p>{movieData.overview}</p>
        </div>
        <div className={styles.item}>
          <p>Popularity rating: {movieData.popularity}</p>
        </div>
      </div>
      <div className={styles.container}>
        {castData.cast.slice(0, 3).map((cast) => {
          return (
            <InfoCard
              key={cast.cast_id}
              title={cast.name}
              image={cast.profile_path as string}
              link={`/people/${cast.id}/`}
            />
          );
        })}
        <Link
          href={`/movies/${movieData.id}/cast?title=${movieData.title}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
          className={styles.card}
        >
          <div className={styles["item-clickable"]}>
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
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await response.json();
  const paths = data.results.map((movie: IMovie) => ({
    params: { movieId: `${movie.id}` },
  }));
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
