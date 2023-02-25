import Header from "@/components/Header";
import Table from "@/components/sortable-table/Table";
import type { ICreditsResponse } from "@/types/movieCredits/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  data: ICreditsResponse;
}

const CreditsDisplay = ({ data }: Props) => {
  const router = useRouter();
  const castColumns = [
    {
      label: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      label: "Character",
      accessor: "character",
      sortable: true,
    },
  ];

  const crewColumns = [
    {
      label: "Name",
      accessor: "name",
      sortable: true,
    },
    { label: "Credit", accessor: "job", sortable: true },
  ];

  return (
    <>
      <Header text={`Credits for "${router.query.title}"`} />

      {data.cast.length > 0 ? (
        <Table
          data={data.cast}
          columns={castColumns}
          caption={"Acting credits"}
        />
      ) : null}
      {data.crew.length > 0 ? (
        <Table
          data={data.crew}
          columns={crewColumns}
          caption={"Crew credits"}
        />
      ) : null}
    </>
  );
};

export default CreditsDisplay;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const movieId = context.params!.movieId;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`
  );
  const data: ICreditsResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
