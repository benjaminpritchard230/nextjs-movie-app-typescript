import styles from "@/styles/CreditsTable.module.css";
import { ICast, ICrew } from "@/types/movieCredits/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = { data: ICast[] };

const MovieActingCreditsTable = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div className={styles["container"]}>
      <table className={styles["content-table"]}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Character</th>
          </tr>
        </thead>
        <tbody>
          {data.map((actor) => {
            return (
              <tr onClick={() => router.push(`/people/${actor.id}`)}>
                <td>{actor.name}</td>
                <td>{actor.character}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MovieActingCreditsTable;
