import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import SearchSelector from "@/components/SearchSelector";
import styles from "@/styles/Popular.module.css";
import { IPeople, IResponse } from "@/types/people/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

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

export default PeopleSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;

  const searchText = context.query.searchText;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
  );
  const data: IResponse = await res.json();
  return {
    props: {
      data,
    },
  };
};
