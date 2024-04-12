import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWraper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto max-w-screen-2xl px-2", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWraper;
