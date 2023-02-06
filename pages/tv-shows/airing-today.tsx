import Header from "@/components/Header";
import InfoCardShow from "@/components/InfoCardShow";
import type { IResponse, ITvShow } from "@/types/tv-shows/types";
import { GetStaticProps } from "next";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";

interface Props {
  data: IResponse;
}

const TvAiringToday = ({ data }: Props) => {
  return (
    <>
      <Header text="Shows on TV today" />
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

export default TvAiringToday;

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
