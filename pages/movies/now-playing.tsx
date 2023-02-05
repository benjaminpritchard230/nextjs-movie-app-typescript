import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
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

const MovieNowPlaying = ({ data }: Props) => {
  return (
    <>
      <Header text="Movies playing now" />
      <CardGroup>
        {data.results.map((movie: IMovie) => {
          return (
            <Col className={"d-flex justify-content-center"} key={movie.id}>
              <InfoCard movie={movie} />
            </Col>
          );
        })}
      </CardGroup>
    </>
  );
};

export default MovieNowPlaying;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1&region=gb`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
