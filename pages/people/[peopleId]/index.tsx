import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { IPeople, IPeopleDetails, IResponse } from "@/types/people/types";
import { IMoviePeopleCredits } from "@/types/peopleCredits/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  personData: IPeopleDetails;
  creditsData: IMoviePeopleCredits;
};

const PeopleDetail = ({ personData, creditsData }: Props) => {
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

  const getCredits = (
    personData: IPeopleDetails,
    creditsData: IMoviePeopleCredits
  ) => {
    if (personData.known_for_department === "Acting") {
      return creditsData.cast
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.title === value.title)
        )
        .sort((a, b) => (a.vote_count < b.vote_count ? 1 : -1))
        .slice(0, 3)
        .map((credit) => {
          return (
            <InfoCard
              key={credit.id}
              title={credit.title}
              image={credit.poster_path}
              link={`/movies/${credit.id}?name=${personData.name}`}
            />
          );
        });
    } else {
      return creditsData.crew
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.title === value.title)
        )
        .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))
        .slice(0, 3)
        .map((credit) => {
          return (
            <InfoCard
              key={credit.id}
              title={credit.title}
              image={credit.poster_path}
              link={`/movies/${credit.id}?name=${personData.name}`}
            />
          );
        });
    }
  };

  return (
    <>
      <Header text={personData.name} />
      <div className={styles.container}>
        <div className={styles["item"]}>
          <MyImage />
        </div>
        <div className={styles["item"]}>
          <ul>
            <li>
              <p>Date of birth: {personData.birthday}</p>
              <br />
              {personData.deathday ? (
                <>
                  {" "}
                  <p>{`Date of death: ${personData.deathday}`}</p>
                  <br />
                </>
              ) : null}
              {personData.deathday ? (
                <p>
                  Age at death:{" "}
                  {getAgeAtDeath(personData.birthday, personData.deathday)}
                </p>
              ) : (
                <p>Age: {getAge(personData.birthday)}</p>
              )}
              <br />
              <p>Birthplace: {personData.place_of_birth}</p>
              <br />
              <p>Gender: {personData.gender === 1 ? "female" : "male"}</p>
              <br />
              <p>Also known as: {personData.also_known_as.join(", ")}</p>

              <br />
              {personData.imdb_id != null ? (
                <p>
                  <a href={`https://www.imdb.com/name/${personData.imdb_id}/`}>
                    Link to IMDb profile
                  </a>
                </p>
              ) : null}
            </li>
          </ul>
        </div>
        <div className={styles["item"]}>
          <p>{personData.biography}</p>
        </div>
        <div className={styles["item"]}>
          <p>Popularity rating: {personData.popularity}</p>
        </div>
      </div>

      <div className={styles.container}>
        {getCredits(personData, creditsData)}
        {creditsData.cast.length > 0 || creditsData.crew.length > 0 ? (
          <Link
            href={`/people/${personData.id}/credits?name=${personData.name}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
            className={styles.card}
          >
            <div className={styles["item-clickable"]}>
              <p>See all credits</p>
            </div>
          </Link>
        ) : null}
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
    const creditsData: IMoviePeopleCredits = await creditsResponse.json();

    return {
      props: {
        personData,
        creditsData,
      },
    };
  }
};
