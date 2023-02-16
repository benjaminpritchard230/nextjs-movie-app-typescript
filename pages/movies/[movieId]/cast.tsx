import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.css";
import type { ICast, ICreditsResponse } from "@/types/credits/types";
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
  return (
    <>
      <Header text="Credits" />
      <div className={styles.container}>
        {data.cast.map((cast: ICast) => {
          return (
            <InfoCard
              key={cast.id}
              title={cast.name}
              image={`https://www.themoviedb.org/t/p/w500/${cast.profile_path}`}
              link={`/people/${cast.id}/`}
            />
          );
        })}
      </div>
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
