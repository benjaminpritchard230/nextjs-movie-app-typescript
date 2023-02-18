import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { IResponse, ITvShow, ITvShowDetails } from "@/types/tv-shows/types";
import { ITvShowCredits } from "@/types/tvShowCredits/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CLIENT_RENEG_LIMIT } from "tls";

type Props = {
  tvShowData: ITvShowDetails;
  castData: ITvShowCredits;
};

const TvShowDetail = ({ tvShowData, castData }: Props) => {
  const router = useRouter();
  const tvShowId = router.query.tvShowId;
  console.log(castData, "castdata");

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
            ? `https://www.themoviedb.org/t/p/w1280/${tvShowData.poster_path}`
            : placeholder
        }
        alt={`${tvShowData.name}`}
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
      <Header text={tvShowData.name} style="header--tvshow" />
      <div className={styles.container}>
        <div className={styles["item--tvshow"]}>
          <MyImage />
        </div>
        <div className={styles["item--tvshow"]}>
          <ul>
            <h5>First aired: {tvShowData.first_air_date}</h5>
            <br />
            <h5>Languages: </h5>
            <ul>
              {tvShowData.languages.map((language) => {
                return <li key={language}>{languageNames.of(language)}</li>;
              })}
            </ul>
            <br />
            <h5>Genres: </h5>
            <ul>
              {tvShowData.genres.map((genre) => {
                return <li key={genre.name}>{genre.name}</li>;
              })}
            </ul>
            <br />
            <h5>Networks: </h5>
            <ul>
              {tvShowData.networks.map((network) => {
                return <li key={network.name}>{network.name}</li>;
              })}
            </ul>
          </ul>
        </div>
        <div className={styles["item--tvshow"]}>
          <p>{tvShowData.overview}</p>
        </div>
        <div className={styles["item--tvshow"]}>
          <h5>Popularity rating: {tvShowData.popularity}</h5>
        </div>
      </div>
      <div className={styles.container}>
        {castData.cast.map((cast) => {
          return (
            <InfoCard
              key={cast.id}
              title={cast.name}
              image={cast.profile_path}
              link={`/people/${cast.id}`}
              style={"item--tvshow"}
            />
          );
        })}
        <Link
          href={`/tv-shows/${tvShowData.id}/cast?title=${tvShowData.name}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
          className={styles.card}
        >
          <div className={styles["item--tvshow--clickable"]}>
            <h5>See all cast and crew</h5>
          </div>
        </Link>
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
    const [tvShowResponse, creditsResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/${
          params!.tvShowId
        }?api_key=${key}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${
          params!.tvShowId
        }/credits?api_key=${key}&language=en-US`
      ),
    ]);
    const tvShowData: ITvShowDetails = await tvShowResponse.json();
    const castData: ITvShowCredits = await creditsResponse.json();
    return {
      props: {
        tvShowData,
        castData,
      },
    };
  }
};
