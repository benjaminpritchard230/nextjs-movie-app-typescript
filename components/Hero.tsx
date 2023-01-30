import React from "react";
import { Col } from "react-bootstrap";
import styles from "../styles/Hero.module.css";

type Props = {
  text: string;
};

const Hero = ({ text }: Props) => {
  return (
    <Col className={styles.heroColumn}>
      <div className={styles.heroImage}>
        <div className={styles.heroText}>
          <h1 className={styles.heroHeader}>{text}</h1>
        </div>
      </div>
    </Col>
  );
};

export default Hero;
