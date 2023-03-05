import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.css";
import type { IResponse, ITvShow } from "@/types/tv-shows/types";
import { GetStaticProps } from "next";

interface Props {
  data: IResponse;
}

const TvAiringToday = ({ data }: Props) => {
  return (
    <>
      <Header text="TV Shows airing today" style="header--tvshow" />
      <div className={styles.container}>
        {data.results.map((show: ITvShow) => {
          return (
            <InfoCard
              key={show.id}
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

export default TvAiringToday;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${key}&language=en-US&page=1&region=gb`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
