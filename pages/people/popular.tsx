import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.css";
import { IPeople, IResponse } from "@/types/people/types";
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

const PeoplePopular = ({ data }: Props) => {
  return (
    <>
      <Header text="Popular people" style="header--people" />
      <div className={styles.container}>
        {data.results.map((person: IPeople) => {
          return (
            <InfoCard
              title={person.name}
              image={`https://www.themoviedb.org/t/p/w500/${person.profile_path}`}
              link={`/people/${person.id}/`}
              style="item--people"
            />
          );
        })}
      </div>
    </>
  );
};

export default PeoplePopular;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
