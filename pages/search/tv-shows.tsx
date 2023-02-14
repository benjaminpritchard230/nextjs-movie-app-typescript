import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import SearchSelector from "@/components/SearchSelector";
import styles from "@/styles/Popular.module.css";
import { IResponse, ITvShow } from "@/types/tv-shows/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IResponse;
}

const TvShowSearch = ({ data }: Props) => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  return (
    <>
      <Header
        text={`Showing TV shows matching "${searchText}"`}
        style="header--tvshow"
      />
      <SearchSelector selected="TV Shows" />
      <div className={styles.container}>
        {data.results.map((show: ITvShow) => {
          return (
            <InfoCard
              title={show.name}
              image={`https://www.themoviedb.org/t/p/w500/${show.poster_path}`}
              link={`/tv-shows/${show.id}/`}
              style="item--tvshow"
            />
          );
        })}
      </div>
    </>
  );
};

export default TvShowSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const searchText = context.query.searchText;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&page=1&query=${searchText}&include_adult=false`
  );
  const data: IResponse = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
