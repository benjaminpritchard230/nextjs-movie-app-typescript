import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.css";
import { IPeople, IResponse } from "@/types/people/types";
import { GetStaticProps } from "next";

interface Props {
  data: IResponse;
}

const PeoplePopular = ({ data }: Props) => {
  return (
    <>
      <Header text="Popular people" style="header--people" />
      <div className={styles.container}>
        {data.results.map((person: IPeople) => {
          return (
            <InfoCard
              key={person.id}
              title={person.name}
              image={`https://www.themoviedb.org/t/p/w500/${person.profile_path}`}
              link={`/people/${person.id}/`}
            />
          );
        })}
      </div>
    </>
  );
};

export default PeoplePopular;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1&region=gb`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
