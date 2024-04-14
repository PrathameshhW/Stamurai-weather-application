import dynamic from "next/dynamic";
import React from "react";
const HomePage = dynamic(() => import("@/components/Home"), { ssr: false });

const page = () => {
  return <HomePage />;
};

export default page;
