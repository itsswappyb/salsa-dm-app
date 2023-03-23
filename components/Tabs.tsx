import React, { Dispatch, FC, SetStateAction, useState } from "react";
import clsx from "clsx";
import { Tab } from "@/types";

type Props = {
  labels: string[];
  className?: string;
  selectedLabel: string;
  setSelectedLabel: Dispatch<SetStateAction<Tab>>;
};

const Tabs: FC<Props> = ({
  labels,
  className,
  selectedLabel,
  setSelectedLabel,
}) => {
  return (
    <div className={clsx(className, "btn-group")}>
      {labels.map((label, index) => (
        <button
          className={clsx("btn", label === selectedLabel && "btn-active")}
          onClick={() => setSelectedLabel(label as Tab)}
          key={index}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
