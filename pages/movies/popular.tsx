import InfoCard from "@/components/InfoCard";
import { GetStaticProps } from "next";
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Props {
  data: Root;
}

const MoviePopular = ({ data }: Props) => {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {data.results.map((movie: Result) => {
        return (
          <Col>
            <InfoCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  );
};

export default MoviePopular;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=9fb5564d1a088cb776b062fc755ea04e&language=en-US&page=1"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
