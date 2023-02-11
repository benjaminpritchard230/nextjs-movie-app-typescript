import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/InfoPage.module.css";
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

  const shorten = (
    str: string,
    maxLen: number,
    separator: string = " "
  ): string => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  };

  return (
    <>
      <Header text={data.name} secondaryText={data.known_for_department} />
      <div className={styles.container}>
        <div className={styles.item}>
          <MyImage />
        </div>
        <div className={styles.item}>
          <ul>
            <li>
              <p>Date of birth: {data.birthday}</p>
              {data.deathday ? (
                <p>{`Date of death: ${data.deathday}`}</p>
              ) : null}
              <p>Birthplace: {data.place_of_birth}</p>
              <p>Gender: {data.gender === 1 ? "female" : "male"}</p>
              <p>Also known as: {data.also_known_as.join(", ")}</p>
              <p>
                <a href={`https://www.imdb.com/name/${data.imdb_id}/`}>
                  Link to IMDb profile
                </a>
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.item}>
          <p>{shorten(data.biography, 600)}</p>
        </div>
        <div className={styles.item}></div>
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
