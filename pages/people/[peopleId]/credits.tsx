import Header from "@/components/Header";
import Table from "@/components/sortable-table/Table";
import { IPeopleCredits } from "@/types/peopleCredits/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  data: IPeopleCredits;
}

const CreditsDisplay = ({ data }: Props) => {
  const router = useRouter();
  const castColumns = [
    { label: "Title", accessor: "title", sortable: true },
    { label: "Character", accessor: "character", sortable: true },
    { label: "Date", accessor: "release_date", sortable: true },
  ];
  const crewColumns = [
    { label: "Title", accessor: "title", sortable: true },
    { label: "Character", accessor: "character", sortable: true },
    { label: "Date", accessor: "release_date", sortable: true },
  ];

  return (
    <>
      <Header text={`Credits for "${router.query.name}"`} />
      {data.cast.length > 0 ? (
        <Table
          data={data.cast}
          columns={castColumns}
          caption={"Credits as an actor"}
        />
      ) : null}
      {data.crew.length > 0 ? (
        <Table
          data={data.crew}
          columns={crewColumns}
          caption={"Credits as crew"}
        />
      ) : null}
    </>
  );
};

export default CreditsDisplay;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const peopleId = context.params!.peopleId;

  const res = await fetch(
    `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?api_key=${key}&language=en-US`
  );
  const data: IPeopleCredits = await res.json();

  return {
    props: {
      data,
    },
  };
};
