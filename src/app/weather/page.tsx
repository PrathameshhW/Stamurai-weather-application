"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("country");
  console.log(search);

  return <div>{params.slug}</div>;
};

export default page;
