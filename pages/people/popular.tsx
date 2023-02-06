import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import InfoCardPeople from "@/components/InfoCardPeople";
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
      <Header text="Popular people" />
      <CardGroup>
        {data.results.map((person: IPeople) => {
          return (
            <Col className={"d-flex justify-content-center"} key={person.id}>
              <InfoCardPeople person={person} />
            </Col>
          );
        })}
      </CardGroup>
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
