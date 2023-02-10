import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import TestCard from "@/components/TestCard";
import styles from "@/styles/Popular.module.css";
import type { IMovie, IResponse } from "@/types/movies/types";
import { GetStaticProps } from "next";
import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IResponse;
}

const MoviePopular = ({ data }: Props) => {
  return (
    <>
      <Header text="Popular movies" />
      <div className={styles.container}>
        {data.results.map((movie: IMovie) => {
          return <InfoCard movie={movie} />;
        })}
      </div>
    </>
  );
};

export default MoviePopular;

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
