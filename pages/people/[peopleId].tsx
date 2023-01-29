import { useRouter } from "next/router";
import React from "react";
type Props = {};

const PeopleDetail = (props: Props) => {
  const router = useRouter();
  const peopleId = router.query.peopleId;
  return <div>{`Details about person with id ${peopleId}`}</div>;
};

export default PeopleDetail;
