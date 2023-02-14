import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/InfoPage.module.css";
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

  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });

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
    <>
      <Header
        text={data.name}
        secondaryText={`"${data.tagline}"`}
        style="header--tvshow"
      />
      <div className={styles.container}>
        <div className={styles["item--tvshow"]}>
          <MyImage />
        </div>
        <div className={styles["item--tvshow"]}>
          <ul>
            <h5>First aired: {data.first_air_date}</h5>
            <h5>Languages: </h5>
            <ul>
              {data.languages.map((language) => {
                return <li>{languageNames.of(language)}</li>;
              })}
            </ul>
            <br />
            <h5>Genres: </h5>
            <ul>
              {data.genres.map((genre) => {
                return <li>{genre.name}</li>;
              })}
            </ul>
            <br />
            <h5>Networks: </h5>
            <ul>
              {data.networks.map((network) => {
                return <li>{network.name}</li>;
              })}
            </ul>
          </ul>
        </div>
        <div className={styles["item--tvshow"]}>
          <p>{data.overview}</p>
        </div>
        <div className={styles["item--tvshow"]}>
          <h5>Popularity rating: {data.popularity}</h5>
        </div>
      </div>
    </>
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
