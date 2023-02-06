import Header from "@/components/Header";
import InfoCardShow from "@/components/InfoCardShow";
import type { IResponse, ITvShow } from "@/types/tv-shows/types";
import { GetStaticProps } from "next";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";

interface Props {
  data: IResponse;
}

const TvShowOnTv = ({ data }: Props) => {
  return (
    <>
      <Header text="Shows on TV now" />
      <CardGroup>
        {data.results.map((show: ITvShow) => {
          return (
            <Col className={"d-flex justify-content-center"} key={show.id}>
              <InfoCardShow show={show} />
            </Col>
          );
        })}
      </CardGroup>
    </>
  );
};

export default TvShowOnTv;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
