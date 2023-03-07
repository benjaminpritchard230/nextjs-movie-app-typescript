import React from "react";
import { SiGithub, SiThemoviedatabase } from "react-icons/si";
import styles from "../styles/Footer.module.scss";
type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className={styles["footer"]}>
      <span>
        <SiGithub className={styles["logo"]} />
        <a href="https://github.com/benjaminpritchard230/nextjs-movie-app-typescript">
          Github
        </a>
      </span>
      Created by Ben Pritchard 2023{" "}
      <span>
        <SiThemoviedatabase className={styles["logo"]} />
        Powered by MovieDB API
      </span>
    </footer>
  );
};

export default Footer;
