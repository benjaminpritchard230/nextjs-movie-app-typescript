import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import NextPrevious from "@/components/NextPrevious";
import SearchSelector from "@/components/SearchSelector";
import styles from "@/styles/Popular.module.scss";
import { IResponse, ITvShow } from "@/types/tv-shows/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  data: IResponse;
}

const TvShowSearch = ({ data }: Props) => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  const pageNumber = router.query.pageNumber;

  return (
    <>
      <Header
        text={`Showing TV shows matching "${searchText}":`}
        style="header--tvshow"
      />
      <SearchSelector selected="TV Shows" />
      <NextPrevious
        current={pageNumber as string}
        category="tv-shows"
        totalPages={data.total_pages}
      />
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
      <NextPrevious
        current={pageNumber as string}
        category="tv-shows"
        totalPages={data.total_pages}
      />
    </>
  );
};

export default TvShowSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const searchText = context.query.searchText;
  const pageNumber = context.query.pageNumber ? context.query.pageNumber : 1;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&page=${pageNumber}&query=${searchText}&include_adult=false`
  );
  const data: IResponse = await res.json();
  return {
    props: {
      data,
    },
  };
};
