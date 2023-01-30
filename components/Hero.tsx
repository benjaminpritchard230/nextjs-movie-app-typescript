import React from "react";
import { Col } from "react-bootstrap";
import styles from "../styles/Hero.module.css";

type Props = {};

const Hero = (props: Props) => {
  return (
    <Col className={styles.heroColumn}>
      <div className={styles.heroImage}>
        <div className={styles.heroText}>
          <h1 className={styles.heroHeader}>bloom</h1>
          <p>inner and outer self-care</p>
        </div>
      </div>
    </Col>
  );
};

export default Hero;
