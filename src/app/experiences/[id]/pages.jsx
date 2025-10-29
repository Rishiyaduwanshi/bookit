"use client";
import { useParams } from "next/navigation";

const experiencesById = () => {
  const id = useParams().id;

  return <div className="flex flex-col"></div>;
};

export default experiencesById;
