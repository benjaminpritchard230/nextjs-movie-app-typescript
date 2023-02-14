import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import SearchSelector from "@/components/SearchSelector";
import styles from "@/styles/Popular.module.css";
import { IPeople, IResponse } from "@/types/people/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IResponse;
}

const PeopleSearch = ({ data }: Props) => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  return (
    <>
      <Header
        text={`Showing people matching "${searchText}":`}
        style="header--people"
      />
      <SearchSelector selected="People" />
      <div className={styles.container}>
        {data.results.map((person: IPeople) => {
          return (
            <InfoCard
              title={person.name}
              image={`https://www.themoviedb.org/t/p/w500/${person.profile_path}`}
              link={`/people/${person.id}/`}
              style="item--people"
            />
          );
        })}
      </div>
    </>
  );
};

export default PeopleSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;

  const searchText = context.query.searchText;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
  );
  const data: IResponse = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
