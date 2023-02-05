import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import { IPeople, IResponse } from "@/types/people/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  data: IResponse;
}

const PeopleSearch = ({ data }: Props) => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  return (
    <>
      <Row>
        <Hero text={`Show people matching "${searchText}"`} />
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data.results.map((person: IPeople) => {
          return (
            <Col key={person.id}>
              <h1>{person.name}</h1>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default PeopleSearch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;

  const searchText = context.query.searchText;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${key}&language=en-US&query=harry&page=1&include_adult=false`
  );
  const data: IResponse = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
