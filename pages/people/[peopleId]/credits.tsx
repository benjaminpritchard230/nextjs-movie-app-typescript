import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.css";
import { ICast, IPeopleCredits } from "@/types/peopleCredits/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IPeopleCredits;
}

const CreditsDisplay = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      <Header text={`Acting credits for "${router.query.name}"`} />
      <div className={styles.container}>
        {data.cast.map((credit: ICast) => {
          return (
            <InfoCard
              key={credit.id}
              title={credit.title}
              image={`https://www.themoviedb.org/t/p/w500/${credit.poster_path}`}
              link={`/movies/${credit.id}/`}
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
  const peopleId = context.params!.peopleId;

  const res = await fetch(
    `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?api_key=${key}&language=en-US`
  );
  const data: IPeopleCredits = await res.json();

  return {
    props: {
      data,
    },
  };
};
