import styles from "@/styles/CreditsTable.module.css";
import { IPeopleCredits } from "@/types/peopleCredits/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = { data: IPeopleCredits };

const CreditsTable = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div className={styles["container"]}>
      <h5>Film credits</h5>
      <table className={styles["content-table"]}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Credit</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>
          {data.cast.map((cast) => {
            return (
              <tr onClick={() => router.push(`/movies/${cast.id}`)}>
                <td>{cast.title}</td>

                <td>{cast.character}</td>
                <td>{new Date(cast.release_date).getFullYear()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CreditsTable;
