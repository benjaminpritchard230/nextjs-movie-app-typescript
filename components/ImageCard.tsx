import styles from "@/styles/InfoCard.module.css";

import placeholder from "@/public/placeholder.png";
import type { IMovie } from "@/types/movies/types";
import { profile } from "console";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import profilePic from "../public/pib.jpg";

type Props = {
  title: string;
  image?: string;
  link: string;
};

const ImageCard = ({ title, image, link }: Props) => {
  const myLoader = ({ src }: any) => {
    return src;
  };

  const [error, setError] = useState(false);

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src={
          !error ? `https://www.themoviedb.org/t/p/w500/${image}` : placeholder
        }
        alt={title}
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

  // const percentage = Math.floor((movie.vote_average / 10) * 100);
  return (
    <Link
      href={link}
      style={{ color: "inherit", textDecoration: "inherit" }}
      className={styles.card}
    >
      <MyImage />
    </Link>
  );
};

export default ImageCard;
