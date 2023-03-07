import styles from "@/styles/InfoCard.module.scss";

import placeholder from "@/public/placeholder.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  title: string;
  image?: string;
  link: string;
};

const InfoCard = ({ title, image, link }: Props) => {
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
      <div className={styles["item"]}>
        <MyImage />
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default InfoCard;
