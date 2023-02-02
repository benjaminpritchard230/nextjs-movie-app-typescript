import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import type { IMovie, IMovieDetails, IResponse } from "@/types/movies/types";
import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
type Props = {
  data: IMovieDetails;
};

const MovieDetail = ({ data }: Props) => {
  const router = useRouter();
  const movieId = router.query.movieId;
  const myLoader = ({ src, width, quality }: any) => {
    return `https://www.themoviedb.org/t/p/w1280/${data.poster_path}`;
  };

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
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Header text={data.title} />
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4">
        <Col>
          <MyImage />
        </Col>
        <Col>
          <h3>{data.overview}</h3>
          <h3>{data.release_date}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.query.movieId;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=9fb5564d1a088cb776b062fc755ea04e&language=en-US`
  );
  const data: IMovieDetails = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
