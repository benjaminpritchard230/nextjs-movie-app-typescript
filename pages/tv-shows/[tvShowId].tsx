import { useRouter } from "next/router";
import React from "react";
type Props = {};

const TvShowDetail = (props: Props) => {
  const router = useRouter();
  const tvShowId = router.query.tvShowId;
  return (
    <div>
      <h1> {`Details about tv show with id ${tvShowId}`}</h1>
    </div>
  );
};

export default TvShowDetail;
