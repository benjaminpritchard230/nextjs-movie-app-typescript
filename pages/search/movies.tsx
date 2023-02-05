import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import type { IMovie, IResponse } from "@/types/movies/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
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
      <Container fluid>
        <Row>
          <Header text={`Showing movies matching "${searchText}"`} />
        </Row>
      </Container>
      <Container fluid className="d-flex justify-content-center">
        <Row xs={1} md={2} lg={3} xl={5} className="g-4 my-3">
          {data.results.map((movie: IMovie) => {
            return (
              <Col className={"d-flex justify-content-center"} key={movie.id}>
                <InfoCard movie={movie} />
              </Col>
            );
          })}
        </Row>
      </Container>
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
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
