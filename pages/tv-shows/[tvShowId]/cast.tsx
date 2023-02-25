import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/Popular.module.css";
import { ITvShowCredits } from "@/types/tvShowCredits/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  data: ITvShowCredits;
}

const CreditsDisplay = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      <Header text={`Credits for "${router.query.title}"`} />
      <div className={styles.container}>
        {data.cast.map((cast) => {
          return (
            <InfoCard
              key={cast.id}
              title={cast.name}
              image={cast.profile_path}
              link={`/people/${cast.id}`}
              style={"item--tvshow"}
            />
          );
        })}
      </div>
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
