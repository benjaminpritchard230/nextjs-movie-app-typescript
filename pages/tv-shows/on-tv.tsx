import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.scss";
import type { IResponse, ITvShow } from "@/types/tv-shows/types";
import { GetStaticProps } from "next";

interface Props {
  data: IResponse;
}

const TvShowOnTv = ({ data }: Props) => {
  return (
    <>
      <Header text="TV Shows on now" style="header--tvshow" />
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

export default TvShowOnTv;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1&region=gb`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 86400,
  };
};
