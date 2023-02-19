import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import MovieActingCreditsTable from "@/components/MovieActingCreditsTable";
import MovieCrewCreditsTable from "@/components/MovieCrewCreditsTable";
import styles from "@/styles/Popular.module.css";
import type { ICast, ICreditsResponse } from "@/types/movieCredits/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: ICreditsResponse;
}

const CreditsDisplay = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      <Header text={`Credits for "${router.query.title}"`} />
      <MovieActingCreditsTable data={data.cast} />
      <MovieCrewCreditsTable data={data.crew} />
    </>
  );
};

export default CreditsDisplay;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const movieId = context.params!.movieId;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`
  );
  const data: ICreditsResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
