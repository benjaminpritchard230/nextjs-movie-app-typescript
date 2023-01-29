import { useRouter } from "next/router";
import React from "react";
type Props = {};

const MovieDetail = (props: Props) => {
  const router = useRouter();
  const movieId = router.query.movieId;
  return <div>{`Details about movie with id ${movieId}`}</div>;
};

export default MovieDetail;
