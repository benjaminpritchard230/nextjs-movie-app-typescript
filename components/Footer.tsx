import React from "react";
import { SiGithub, SiThemoviedatabase } from "react-icons/si";
type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="footer">
      <span>
        <SiGithub className="footer__logo" />
        <a href="https://github.com/benjaminpritchard230/nextjs-movie-app-typescript">
          Github
        </a>
      </span>
      Created by Ben Pritchard 2023{" "}
      <span>
        <SiThemoviedatabase className="footer__logo" />
        Powered by MovieDB API
      </span>
    </footer>
  );
};

export default Footer;
