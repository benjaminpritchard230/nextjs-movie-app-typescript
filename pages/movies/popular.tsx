import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import type { IMovie, IResponse } from "@/types/movies/types";
import { GetStaticProps } from "next";
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IResponse;
}

const MoviePopular = ({ data }: Props) => {
  return (
    <>
      <Row>
        <Hero text={"Popular movies"} />
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data.results.map((movie: IMovie) => {
          return (
            <Col>
              <InfoCard movie={movie} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default MoviePopular;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=9fb5564d1a088cb776b062fc755ea04e&language=en-US&page=1"
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
