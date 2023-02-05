import Hero from "@/components/Hero";
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
      <Row>
        <Hero text={`Showing TV shows matching "${searchText}"`} />
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data.results.map((show: ITvShow) => {
          return (
            <Col key={show.id}>
              <h1>{show.name}</h1>
            </Col>
          );
        })}
      </Row>
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
