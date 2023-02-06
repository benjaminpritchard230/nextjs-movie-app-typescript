import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import { IPeople, IPeopleDetails, IResponse } from "@/types/people/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CLIENT_RENEG_LIMIT } from "tls";

type Props = {
  data: IPeopleDetails;
};

const PeopleDetail = ({ data }: Props) => {
  const router = useRouter();
  const peopleId = router.query.peopleId;
  const myLoader = ({ src, width, quality }: any) => {
    return `https://www.themoviedb.org/t/p/w1280/${data.profile_path}`;
  };
  console.log(data);

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src="me.png"
        alt={`${data.name}`}
        width={400}
        height={600}
      />
    );
  };
  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <Header text={data.name} />
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4">
        <Col>
          <MyImage />
        </Col>
        <Col>
          <h3>{data.place_of_birth}</h3>
          <h3>{data.gender}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default PeopleDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = process.env.DB_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await response.json();
  const paths = data.results.map((people: IPeople) => ({
    params: { peopleId: `${people.id}` },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  {
    const { params } = context;
    console.log(params);
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${
        params!.peopleId
      }?api_key=${key}&language=en-US`
    );
    const data = await response.json();

    console.log(`Generating page for /posts/${params!.peopleId}`);

    return {
      props: {
        data: data,
      },
    };
  }
};
