import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import placeholder from "@/public/placeholder.png";
import styles from "@/styles/InfoPage.module.scss";
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
      <div className={styles["parent"]}>
        <div className={styles["item1"]}>
          <MyImage />
        </div>
        <div className={styles["item2"]}>
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
        <div className={styles["item3"]}>
          <p>{tvShowData.overview}</p>
        </div>
        <div className={styles["item4"]}>
          <p>Popularity rating: {tvShowData.popularity}</p>
        </div>

        {castData.cast.slice(0, 3).map((cast, index) => {
          return (
            <>
              <Link
                href={`/people/${cast.id}`}
                className={styles[`item${index + 5}`]}
              >
                <Image
                  loader={myLoader}
                  src={
                    !error
                      ? `https://www.themoviedb.org/t/p/w1280/${cast.profile_path}`
                      : placeholder
                  }
                  alt={`${cast.name}`}
                  width={400}
                  height={600}
                  className={styles["img"]}
                  onError={() => {
                    setError(true);
                  }}
                  unoptimized
                  priority
                />
                <p>{cast.name}</p>
              </Link>
            </>
          );
        })}
        <Link
          href={`/tv-shows/${tvShowData.id}/cast?title=${tvShowData.name}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
          className={styles["item8"]}
        >
          <h2>See all cast and crew</h2>
        </Link>
      </div>
    </>
  );
};

export default TvShowDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = process.env.DB_KEY;
  const responsesJSON = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1&region=gb`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1&region=gb`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${key}&language=en-US&page=1&region=gb`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1&region=gb`
    ),
  ]);
  const [popularData, topRatedData, airingTodayData, onAirData]: IResponse[] =
    await Promise.all(responsesJSON.map((response) => response.json()));

  const paths = popularData.results
    .map((show: ITvShow) => ({
      params: { tvShowId: `${show.id}` },
    }))
    .concat(
      topRatedData.results.map((show: ITvShow) => ({
        params: { tvShowId: `${show.id}` },
      })),
      airingTodayData.results.map((show: ITvShow) => ({
        params: { tvShowId: `${show.id}` },
      })),
      onAirData.results.map((show: ITvShow) => ({
        params: { tvShowId: `${show.id}` },
      }))
    );
  return {
    paths,
    fallback: "blocking",
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const key = process.env.DB_KEY;
//   const response = await fetch(
//     `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`
//   );
//   const data: IResponse = await response.json();
//   const paths = data.results.map((show: ITvShow) => ({
//     params: { tvShowId: `${show.id}` },
//   }));
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

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
