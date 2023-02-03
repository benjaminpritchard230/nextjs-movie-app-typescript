import type { IMovie } from "@/types/movies/types";
import { profile } from "console";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
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
        alt={movie.title}
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
      <Card>
        <MyImage />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default InfoCard;
