import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { IResponse, ITvShow, ITvShowDetails } from "@/types/tv-shows/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
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
  console.log(data);

  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  const [error, setError] = useState(false);

  const myLoader = ({ src }: any) => {
    return src;
  };
  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src={
          !error
            ? `https://www.themoviedb.org/t/p/w1280/${data.poster_path}`
            : placeholder
        }
        alt={`${data.name}`}
        width={400}
        height={600}
        className={styles.img}
        onError={() => {
          setError(true);
        }}
        unoptimized
        priority
      />
    );
  };
  return (
    <>
      <Header text={data.name} style="header--tvshow" />
      <div className={styles.container}>
        <div className={styles["item--tvshow"]}>
          <MyImage />
        </div>
        <div className={styles["item--tvshow"]}>
          <ul>
            <h5>First aired: {data.first_air_date}</h5>
            <br />
            <h5>Languages: </h5>
            <ul>
              {data.languages.map((language) => {
                return <li key={language}>{languageNames.of(language)}</li>;
              })}
            </ul>
            <br />
            <h5>Genres: </h5>
            <ul>
              {data.genres.map((genre) => {
                return <li key={genre.name}>{genre.name}</li>;
              })}
            </ul>
            <br />
            <h5>Networks: </h5>
            <ul>
              {data.networks.map((network) => {
                return <li key={network.name}>{network.name}</li>;
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
