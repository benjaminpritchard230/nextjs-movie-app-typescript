import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import type { IMovie, IResponse } from "@/types/movies/types";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IResponse;
}

const MovieSearch = ({ data }: Props) => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  return (
    <>
      <Row>
        <Hero text={`Showing movies matching "${searchText}"`} />
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data.results.map((movie: IMovie) => {
          return (
            <Col>
              <InfoCard movie={movie} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default MovieSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchText = context.query.searchText;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9fb5564d1a088cb776b062fc755ea04e&language=en-US&query=${searchText}&page=1&include_adult=false`
  );
  const data: IResponse = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
