import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import Table from "@/components/sortable-table/Table";
import styles from "@/styles/Popular.module.scss";
import { ITvShowCredits } from "@/types/tvShowCredits/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  data: ITvShowCredits;
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
  const tvShowId = context.params!.tvShowId;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${key}&language=en-US`
  );
  const data: ITvShowCredits = await res.json();

  return {
    props: {
      data,
    },
  };
};
