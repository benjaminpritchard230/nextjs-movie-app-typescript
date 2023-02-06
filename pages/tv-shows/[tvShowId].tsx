import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import { IResponse, ITvShow, ITvShowDetails } from "@/types/tv-shows/types";
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
  data: ITvShowDetails;
};

const TvShowDetail = ({ data }: Props) => {
  const router = useRouter();
  const tvShowId = router.query.tvShowId;
  const myLoader = ({ src, width, quality }: any) => {
    return `https://www.themoviedb.org/t/p/w1280/${data.poster_path}`;
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
          {/* <h3>{data.created_by}</h3>
          <h3>{data.networks}</h3> */}
        </Col>
      </Row>
    </Container>
  );
};

export default TvShowDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = process.env.DB_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await response.json();
  const paths = data.results.map((show: ITvShow) => ({
    params: { tvShowId: `${show.id}` },
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
      `https://api.themoviedb.org/3/tv/${
        params!.tvShowId
      }?api_key=${key}&language=en-US`
    );
    const data: ITvShowDetails = await response.json();

    console.log(`Generating page for /posts/${params!.tvShowId}`);

    return {
      props: {
        data: data,
      },
    };
  }
};
