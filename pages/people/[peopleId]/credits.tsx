import Header from "@/components/Header";
import Table from "@/components/sortable-table/Table";
import {
  IMoviePeopleCredits,
  ITvPeopleCredits,
} from "@/types/peopleCredits/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  movieData: IMoviePeopleCredits;
  tvData: ITvPeopleCredits;
}

const CreditsDisplay = ({ movieData, tvData }: Props) => {
  const router = useRouter();
  const movieCastColumns = [
    { label: "Title", accessor: "title", sortable: true },
    { label: "Character", accessor: "character", sortable: true },
    { label: "Date", accessor: "release_date", sortable: true },
  ];
  const movieCrewColumns = [
    { label: "Title", accessor: "title", sortable: true },
    { label: "Role", accessor: "job", sortable: true },
    { label: "Date", accessor: "release_date", sortable: true },
  ];
  const tvCastColumns = [
    { label: "Title", accessor: "name", sortable: true },
    { label: "Character", accessor: "character", sortable: true },
    { label: "Date", accessor: "first_air_date", sortable: true },
  ];
  const tvCrewColumns = [
    { label: "Title", accessor: "name", sortable: true },
    { label: "Role", accessor: "job", sortable: true },
    { label: "Date", accessor: "first_air_date", sortable: true },
  ];

  return (
    <>
      <Header text={`Credits for "${router.query.name}"`} />
      {movieData.cast.length > 0 ? (
        <Table
          data={movieData.cast}
          columns={movieCastColumns}
          caption={"Movie credits as an actor"}
        />
      ) : null}
      {tvData.cast.length > 0 ? (
        <Table
          data={tvData.cast}
          columns={tvCastColumns}
          caption={"TV credits as an actor"}
        />
      ) : null}
      {movieData.crew.length > 0 ? (
        <Table
          data={movieData.crew}
          columns={movieCrewColumns}
          caption={"Movie credits as crew"}
        />
      ) : null}
      {tvData.crew.length > 0 ? (
        <Table
          data={tvData.crew}
          columns={tvCrewColumns}
          caption={"TV credits as crew"}
        />
      ) : null}
    </>
  );
};

export default CreditsDisplay;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.DB_KEY;
  const peopleId = context.params!.peopleId;

  const [movieResponse, tvResponse] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?api_key=${key}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/person/${peopleId}/tv_credits?api_key=${key}&language=en-US`
    ),
  ]);
  const movieData: IMoviePeopleCredits = await movieResponse.json();
  const tvData: ITvPeopleCredits = await tvResponse.json();

  return {
    props: {
      movieData,
      tvData,
    },
  };
};
