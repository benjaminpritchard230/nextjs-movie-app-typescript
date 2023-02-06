import styles from "@/styles/InfoCard.module.css";
import type { ITvShow } from "@/types/tv-shows/types";
import { profile } from "console";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import profilePic from "../public/pib.jpg";

type Props = {
  show: ITvShow;
};

interface IImage {
  src: string;
  width: string;
  quality: string;
}

const InfoCard = ({ show }: Props) => {
  const myLoader = ({ src, width, quality }: any) => {
    return `https://www.themoviedb.org/t/p/w500/${show.poster_path}`;
  };

  const MyImage = () => {
    return (
      <Image
        loader={myLoader}
        src="me.png"
        alt={show.name}
        width={400}
        height={600}
        className={"img-fluid"}
      />
    );
  };

  const percentage = Math.floor((show.vote_average / 10) * 100);
  return (
    <Link
      href={`/tv-shows/${show.id}/`}
      style={{ color: "inherit", textDecoration: "inherit" }}
      className={styles.card}
    >
      <Card style={{ height: "100%" }}>
        <MyImage />
        <Card.Title className="d-flex justify-content-center align-items-center">
          {show.name}
        </Card.Title>
        {/* <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          className={styles.progressbar}
        /> */}
      </Card>
    </Link>
  );
};

export default InfoCard;
