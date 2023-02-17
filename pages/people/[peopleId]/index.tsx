import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import Modal from "@/components/Modal";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { ICreditsResponse } from "@/types/movieCredits/types";
import { IPeople, IPeopleDetails, IResponse } from "@/types/people/types";
import { IPeopleCredits } from "@/types/peopleCredits/types";
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
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { CLIENT_RENEG_LIMIT } from "tls";

type Props = {
  personData: IPeopleDetails;
  creditsData: IPeopleCredits;
};

const PeopleDetail = ({ personData, creditsData }: Props) => {
  console.log(creditsData);
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
            ? `https://www.themoviedb.org/t/p/w1280/${personData.profile_path}`
            : placeholder
        }
        alt={`${personData.name}`}
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
      <Header text={personData.name} style="header--people" />
      <div className={styles.container}>
        <div className={styles["item--people"]}>
          <MyImage />
        </div>
        <div className={styles["item--people"]}>
          <ul>
            <li>
              <h5>Date of birth: {personData.birthday}</h5>
              {personData.deathday ? (
                <h5>{`Date of death: ${personData.deathday}`}</h5>
              ) : null}
              {personData.deathday ? (
                <h5>
                  Age at death:{" "}
                  {getAgeAtDeath(personData.birthday, personData.deathday)}
                </h5>
              ) : (
                <h5>Age: {getAge(personData.birthday)}</h5>
              )}
              <h5>Birthplace: {personData.place_of_birth}</h5>
              <h5>Gender: {personData.gender === 1 ? "female" : "male"}</h5>
              <h5>Also known as: {personData.also_known_as.join(", ")}</h5>
              <h5>
                <a href={`https://www.imdb.com/name/${personData.imdb_id}/`}>
                  Link to IMDb profile
                </a>
              </h5>
            </li>
          </ul>
        </div>
        <div className={styles["item--people"]}>
          <p>{personData.biography}</p>
        </div>
        <div className={styles["item--people"]}>
          <h5>Popularity rating: {personData.popularity}</h5>
        </div>
      </div>
      <div className={styles.container}>
        {creditsData.cast.slice(0, 3).map((credit) => {
          return (
            <InfoCard
              key={credit.id}
              title={credit.title}
              image={credit.poster_path}
              link={`/movies/${credit.id}?name=${personData.name}`}
              style="item--people"
            />
          );
        })}
        <Link
          href={`/people/${personData.id}/credits?name=${personData.name}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
          className={styles.card}
        >
          <div className={styles["item--people"]}>
            <h5>See all acting credits</h5>
          </div>
        </Link>
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

// export const getStaticProps: GetStaticProps = async (context) => {
//   const key = process.env.DB_KEY;

//   {
//     const { params } = context;
//     const response = await fetch(
//       `https://api.themoviedb.org/3/person/${
//         params!.peopleId
//       }?api_key=${key}&language=en-US`
//     );
//     const data = await response.json();

//     return {
//       props: {
//         data: data,
//       },
//     };
//   }
// };

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  {
    const { params } = context;

    const [personResponse, creditsResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/person/${
          params!.peopleId
        }?api_key=${key}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${
          params!.peopleId
        }/movie_credits?api_key=${key}&language=en-US`
      ),
    ]);
    const personData: IPeopleDetails = await personResponse.json();
    const creditsData: IPeopleCredits = await creditsResponse.json();

    return {
      props: {
        personData,
        creditsData,
      },
    };
  }
};
