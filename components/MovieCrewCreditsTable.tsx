import styles from "@/styles/CreditsTable.module.css";
import { ICast, ICrew } from "@/types/movieCredits/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = { data: ICrew[] };

const MovieCrewCreditsTable = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div className={styles["container"]}>
      <table className={styles["content-table"]}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crew) => {
            return (
              <tr onClick={() => router.push(`/people/${crew.id}`)}>
                <td>{crew.name}</td>
                <td>{crew.job}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MovieCrewCreditsTable;
