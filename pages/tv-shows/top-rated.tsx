import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.css";
import type { IResponse, ITvShow } from "@/types/tv-shows/types";
import { GetStaticProps } from "next";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";

interface Props {
  data: IResponse;
}

const TvTopRated = ({ data }: Props) => {
  return (
    <>
      <Header text="Top rated TV Shows" />
      <div className={styles.container}>
        {data.results.map((show: ITvShow) => {
          return (
            <InfoCard
              title={show.name}
              image={`https://www.themoviedb.org/t/p/w500/${show.poster_path}`}
              link={`/tv-shows/${show.id}/`}
            />
          );
        })}
      </div>
    </>
  );
};

export default TvTopRated;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
