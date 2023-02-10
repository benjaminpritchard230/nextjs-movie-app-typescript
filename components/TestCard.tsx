import styles from "@/styles/TestCard.module.css";
import React from "react";

type Props = {};

const TestCard = (props: Props) => {
  return (
    <div className={styles.item}>
      <img
        className={styles.img}
        src="https://images.pexels.com/photos/14800043/pexels-photo-14800043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
      />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus,
        numquam.
      </p>
    </div>
  );
};

export default TestCard;
