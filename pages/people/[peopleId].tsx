import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import Modal from "@/components/Modal";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { IPeople, IPeopleDetails, IResponse } from "@/types/people/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { CLIENT_RENEG_LIMIT } from "tls";

type Props = {
  data: IPeopleDetails;
};

const PeopleDetail = ({ data }: Props) => {
  const myLoader = ({ src }: any) => {
    return src;
  };

  const [error, setError] = useState(false);

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src={
          !error
            ? `https://www.themoviedb.org/t/p/w1280/${data.profile_path}`
            : placeholder
        }
        alt={`${data.name}`}
        width={400}
        height={600}
        className={styles.img}
        onError={() => {
          setError(true);
        }}
      />
    );
  };

  const getAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getAgeAtDeath = (birthday: string, deathday: string) => {
    const birthDate = new Date(birthday);
    const deathDate = new Date(deathday);
    const age = deathDate.getFullYear() - birthDate.getFullYear();

    return age;
  };

  return (
    <>
      <Header text={data.name} style="header--people" />
      <div className={styles.container}>
        <div className={styles["item--people"]}>
          <MyImage />
        </div>
        <div className={styles["item--people"]}>
          <ul>
            <li>
              <h5>Date of birth: {data.birthday}</h5>
              {data.deathday ? (
                <h5>{`Date of death: ${data.deathday}`}</h5>
              ) : null}
              {data.deathday ? (
                <h5>
                  Age at death: {getAgeAtDeath(data.birthday, data.deathday)}
                </h5>
              ) : (
                <h5>Age: {getAge(data.birthday)}</h5>
              )}
              <h5>Birthplace: {data.place_of_birth}</h5>
              <h5>Gender: {data.gender === 1 ? "female" : "male"}</h5>
              <h5>Also known as: {data.also_known_as.join(", ")}</h5>
              <h5>
                <a href={`https://www.imdb.com/name/${data.imdb_id}/`}>
                  Link to IMDb profile
                </a>
              </h5>
            </li>
          </ul>
        </div>
        <div className={styles["item--people"]}>
          <p>{data.biography}</p>
        </div>
        <div className={styles["item--people"]}>
          <h5>Popularity rating: {data.popularity}</h5>
        </div>
      </div>
    </>
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
