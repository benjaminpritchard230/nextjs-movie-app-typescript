import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import SearchSelector from "@/components/SearchSelector";
import styles from "@/styles/Popular.module.scss";
import type { IMovie, IResponse } from "@/types/movies/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  data: IResponse;
}

const MovieSearch = ({ data }: Props) => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  return (
    <>
      <Header text={`Showing movies matching "${searchText}":`} />
      <SearchSelector selected="Movies" />
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

export default MovieSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const searchText = context.query.searchText;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchText}&page=1&include_adult=false`
  );
  const data: IResponse = await res.json();
  return {
    props: {
      data,
    },
  };
};
