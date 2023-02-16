import CastDisplay from "@/components/CastDisplay";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { ICast, ICreditsResponse } from "@/types/credits/types";
import type { IMovie, IMovieDetails, IResponse } from "@/types/movies/types";
import { light } from "@mui/material/styles/createPalette";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CLIENT_RENEG_LIMIT } from "tls";

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
              <h5>Release date: {movieData.release_date}</h5>
              {movieData.budget ? <h5>Budget: ${movieData.budget}</h5> : null}
              {movieData.revenue ? (
                <h5>Revenue: ${movieData.revenue}</h5>
              ) : null}
              <h5>Runtime: {getRunTime(movieData.runtime)}</h5>
              <br />
              <h5>Production companies:</h5>
              <ul>
                {movieData.production_companies.map((company) => {
                  return <li key={company.id}>{company.name}</li>;
                })}
              </ul>
              <br />
              <h5>Genres: </h5>
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
          <h5>Popularity rating: {movieData.popularity}</h5>
        </div>
      </div>
      <div className={styles.container}>
        {castData.cast.slice(0, 3).map((cast) => {
          return (
            <InfoCard
              key={cast.cast_id}
              title={cast.name}
              image={cast.profile_path as string}
              link={""}
            />
          );
        })}
        <div className={styles.item}>
          <h5>See all cast and crew</h5>
        </div>
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
