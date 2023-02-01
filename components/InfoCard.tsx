import type { Result } from "@/pages/movies/popular";
import { profile } from "console";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import React from "react";
import profilePic from "../public/pib.jpg";
import styles from "../styles/InfoCard.module.css";

type Props = {
  movie: Result;
};

interface IImage {
  src: string;
  width: string;
  quality: string;
}

const myLoader = ({ src, width, quality }: any) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const MyImage = (props: any) => {
  return <Image src={profilePic} alt="Picture of the author" width={440} />;
};

const InfoCard = ({ movie }: Props) => {
  return (
    // <Link
    //   href={`/movies/${movie.id}/`}
    //   style={{ color: "inherit", textDecoration: "inherit" }}
    //   className={styles.card}
    // >
    <div className={styles.card}>
      <img
        className={styles.responsive}
        src={
          "https://www.themoviedb.org/t/p/w342/kuf6dutpsT0vSVehic3EZIqkOBt.jpg"
        }
        alt=""
      />
      <div className={styles.container}>
        <h4 className={styles.title}>
          <b>{movie.title}</b>
        </h4>
        <p>{movie.popularity}</p>
      </div>
    </div>
    // </Link>
  );
};

export default InfoCard;
