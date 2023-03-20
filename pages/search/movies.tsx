import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import NextPrevious from "@/components/NextPrevious";
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
  const pageNumber = router.query.pageNumber;
  return (
    <>
      <Header text={`Showing movies matching "${searchText}":`} />
      <SearchSelector selected="Movies" />
      <NextPrevious
        current={pageNumber as string}
        category="movies"
        totalPages={data.total_pages}
      />
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
      <NextPrevious
        current={pageNumber as string}
        category="movies"
        totalPages={data.total_pages}
      />
    </>
  );
};

export default MovieSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const searchText = context.query.searchText;
  const pageNumber = context.query.pageNumber ? context.query.pageNumber : 1;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchText}&page=${pageNumber}&include_adult=false`
  );
  const data: IResponse = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
