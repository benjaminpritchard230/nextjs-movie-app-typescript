import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import InfoCardShow from "@/components/InfoCardShow";
import type { IResponse, ITvShow } from "@/types/tv-shows/types";
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

const ShowPopular = ({ data }: Props) => {
  return (
    <>
      <Header text="Popular TV Shows" />
      <CardGroup>
        {data.results.map((show: ITvShow) => {
          return (
            <Col className={"d-flex justify-content-center"} key={show.id}>
              <InfoCardShow show={show} />
            </Col>
          );
        })}
      </CardGroup>
    </>
  );
};

export default ShowPopular;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
