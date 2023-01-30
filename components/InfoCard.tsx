import type { Result } from "@/pages/movies/popular";
import Link from "next/link";
import React from "react";
import styles from "../styles/InfoCard.module.css";
type Props = {
  movie: Result;
};

const InfoCard = ({ movie }: Props) => {
  return (
    <Link
      href={`/movies/${movie.id}/`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <div className={styles.card}>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
          style={{ width: "100%" }}
        />
        <div className={styles.container}>
          <h4>
            <b>{movie.title}</b>
          </h4>
          <p>{movie.popularity}</p>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
