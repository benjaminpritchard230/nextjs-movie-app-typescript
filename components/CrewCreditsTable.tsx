import styles from "@/styles/CreditsTable.module.css";
import { ICrew, IPeopleCredits } from "@/types/peopleCredits/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = { data: ICrew[] };

const CrewCreditsTable = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div className={styles["container"]}>
      <table className={styles["content-table"]}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Role</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>
          {data.map((movie) => {
            return (
              <tr onClick={() => router.push(`/movies/${movie.id}`)}>
                <td>{movie.title}</td>
                <td>{movie.job}</td>
                <td>{new Date(movie.release_date).getFullYear()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CrewCreditsTable;
