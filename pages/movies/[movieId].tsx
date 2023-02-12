import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/InfoPage.module.css";
import type { IMovie, IMovieDetails, IResponse } from "@/types/movies/types";
import { light } from "@mui/material/styles/createPalette";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CLIENT_RENEG_LIMIT } from "tls";

type Props = {
  data: IMovieDetails;
};

const MovieDetail = ({ data }: Props) => {
  const router = useRouter();
  const movieId = router.query.movieId;
  const myLoader = ({ src, width, quality }: any) => {
    return `https://www.themoviedb.org/t/p/w1280/${data.poster_path}`;
  };
  console.log(data);

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src="me.png"
        alt={`${data.title}`}
        width={400}
        height={600}
      />
    );
  };
  return (
    <>
      <Header text={data.title} secondaryText={data.tagline} />
      <div className={styles.container}>
        <div className={styles.item}>
          <MyImage />
        </div>
        <div className={styles.item}>
          <ul>
            <li>
              <h5>Release date: {data.release_date}</h5>
              {data.budget ? <h5>Budget: ${data.budget}</h5> : null}
              {data.revenue ? <h5>Revenue: ${data.revenue}</h5> : null}
              <h5>Runtime: {data.runtime}</h5>
              <br />
              <h5>Production companies:</h5>
              <ul>
                {data.production_companies.map((company) => {
                  return <li>{company.name}</li>;
                })}
              </ul>
              <br />
              <h5>Genres: </h5>
              <ul>
                {data.genres.map((genre) => {
                  return <li>{genre.name}</li>;
                })}
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.item}>
          <p>{data.overview}</p>
        </div>
        <div className={styles.item}>
          <h5>Popularity rating: {data.popularity}</h5>
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
    console.log(params);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${
        params!.movieId
      }?api_key=${key}&language=en-US/`
    );
    const data = await response.json();

    console.log(`Generating page for /posts/${params!.movieId}`);

    return {
      props: {
        data: data,
      },
    };
  }
};
