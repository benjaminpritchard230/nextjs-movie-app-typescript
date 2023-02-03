import type { IMovie } from "@/types/movies/types";
import { profile } from "console";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import React from "react";
import profilePic from "../public/pib.jpg";
import styles from "../styles/InfoCard.module.css";

type Props = {
  movie: IMovie;
};

interface IImage {
  src: string;
  width: string;
  quality: string;
}

const InfoCard = ({ movie }: Props) => {
  const myLoader = ({ src, width, quality }: any) => {
    return `https://www.themoviedb.org/t/p/w1280/${movie.poster_path}`;
  };

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src="me.png"
        alt="Picture of the author"
        width={400}
        height={600}
        className={"img-fluid"}
      />
    );
  };
  return (
    <Link
      href={`/movies/${movie.id}/`}
      style={{ color: "inherit", textDecoration: "inherit" }}
      className={styles.card}
    >
      <div className={styles.card}>
        <MyImage />
        <div className={styles.container}>
          <h4 className={styles.title}>
            <b>{movie.title}</b>
          </h4>
          <p>{movie.popularity}</p>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
