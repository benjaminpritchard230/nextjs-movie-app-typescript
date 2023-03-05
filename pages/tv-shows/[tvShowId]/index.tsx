import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.css";
import { IResponse, ITvShow, ITvShowDetails } from "@/types/tv-shows/types";
import { ITvShowCredits } from "@/types/tvShowCredits/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  tvShowData: ITvShowDetails;
  castData: ITvShowCredits;
};

const TvShowDetail = ({ tvShowData, castData }: Props) => {
  const router = useRouter();
  const tvShowId = router.query.tvShowId;

  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  const [error, setError] = useState(false);

  const myLoader = ({ src }: any) => {
    return src;
  };
  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src={
          !error
            ? `https://www.themoviedb.org/t/p/w1280/${tvShowData.poster_path}`
            : placeholder
        }
        alt={`${tvShowData.name}`}
        width={400}
        height={600}
        className={styles.img}
        onError={() => {
          setError(true);
        }}
        unoptimized
        priority
      />
    );
  };
  return (
    <>
      <Header text={tvShowData.name} />
      <div className={styles.container}>
        <div className={styles["item"]}>
          <MyImage />
        </div>
        <div className={styles["item"]}>
          <ul>
            <p>First aired: {tvShowData.first_air_date}</p>
            <br />
            <p>Languages: </p>
            <ul>
              {tvShowData.languages.map((language) => {
                return <li key={language}>{languageNames.of(language)}</li>;
              })}
            </ul>
            <br />
            <p>Genres: </p>
            <ul>
              {tvShowData.genres.map((genre) => {
                return <li key={genre.name}>{genre.name}</li>;
              })}
            </ul>
            <br />
            <p>Networks: </p>
            <ul>
              {tvShowData.networks.map((network) => {
                return <li key={network.name}>{network.name}</li>;
              })}
            </ul>
          </ul>
        </div>
        <div className={styles["item"]}>
          <p>{tvShowData.overview}</p>
        </div>
        <div className={styles["item"]}>
          <p>Popularity rating: {tvShowData.popularity}</p>
        </div>
      </div>
      <div className={styles.container}>
        {castData.cast.slice(0, 3).map((cast) => {
          return (
            <InfoCard
              key={cast.id}
              title={cast.name}
              image={cast.profile_path}
              link={`/people/${cast.id}`}
            />
          );
        })}
        <Link
          href={`/tv-shows/${tvShowData.id}/cast?title=${tvShowData.name}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
          className={styles.card}
        >
          <div className={styles["item-clickable"]}>
            <p>See all cast and crew</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default TvShowDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = process.env.DB_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
  );
  const data: IResponse = await response.json();
  const paths = data.results.map((show: ITvShow) => ({
    params: { tvShowId: `${show.id}` },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = process.env.DB_KEY;

  {
    const { params } = context;
    const [tvShowResponse, creditsResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/tv/${
          params!.tvShowId
        }?api_key=${key}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/${
          params!.tvShowId
        }/credits?api_key=${key}&language=en-US`
      ),
    ]);
    const tvShowData: ITvShowDetails = await tvShowResponse.json();
    const castData: ITvShowCredits = await creditsResponse.json();
    return {
      props: {
        tvShowData,
        castData,
      },
    };
  }
};
