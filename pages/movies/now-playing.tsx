import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.scss";
import type { IMovie, IResponse } from "@/types/movies/types";
import { GetStaticProps } from "next";

interface Props {
  data: IResponse;
}

const MovieNowPlaying = ({ data }: Props) => {
  return (
    <>
      <Header text="Movies playing now" />
      <div className={styles.container}>
        {data.results.map((movie: IMovie) => {
          return (
            <InfoCard
              key={movie.id}
              title={movie.title}
              image={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`}
              link={`/movies/${movie.id}/`}
            />
          );
        })}
      </div>
    </>
  );
};

export default MovieNowPlaying;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1&region=gb`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
