import Header from "@/components/Header";
import styles from "@/styles/About.module.scss";
import React from "react";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <>
      <Header text={"About"} />
      <div className={styles["parent"]}></div>
    </>
  );
};

export default AboutPage;
