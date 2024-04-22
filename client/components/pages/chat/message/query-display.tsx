"use client";

import SQL from "@/client/components/pages/chat/sql";
import { VisualizationType } from "@/client/types/data";
import { useState } from "react";
import Visualization from "../visualization";

type Props = {
  sql: string;
};

const QueryDisplay = ({ sql }: Props) => {
  const [visualizationType, setVisualizationType] =
    useState<VisualizationType>("TABLE");
  return (
    <>
      <SQL
        sql={sql}
        visualizationType={visualizationType}
        setVisualizationType={setVisualizationType}
      />
      <Visualization sql={sql} visualizationType={visualizationType} />
    </>
  );
};

export default QueryDisplay;
