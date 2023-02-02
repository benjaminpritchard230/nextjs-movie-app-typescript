import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import type { IMovie, IResponse } from "@/types/movies/types";
import { GetStaticProps } from "next";
import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IResponse;
}

const MoviePopular = ({ data }: Props) => {
  return (
    <Container fluid className="justify-content-center">
      <Row>
        <Header />
      </Row>
      <Row xs={1} md={2} lg={3} xl={5} className="g-4">
        {data.results.map((movie: IMovie) => {
          return (
            <Col key={movie.id}>
              <InfoCard movie={movie} />
            </Col>
          );
        })}
      </Row>
    </Container>
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
