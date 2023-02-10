import styles from "@/styles/InfoCard.module.css";

import type { IMovie } from "@/types/movies/types";
import { profile } from "console";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import profilePic from "../public/pib.jpg";

type Props = {
  title: string;
  image: string;
  link: string;
};

const InfoCard = ({ title, image, link }: Props) => {
  const myLoader = ({ src, width, quality }: any) => {
    return `https://www.themoviedb.org/t/p/w500/${image}`;
  };

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src="me.png"
        alt={title}
        width={400}
        height={600}
        className={styles.img}
      />
    );
  };

  // const percentage = Math.floor((movie.vote_average / 10) * 100);
  return (
    <Link
      href={link}
      style={{ color: "inherit", textDecoration: "inherit" }}
      className={styles.card}
    >
      <div className={styles.item}>
        <MyImage />
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default InfoCard;
