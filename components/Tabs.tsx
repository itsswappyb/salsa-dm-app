import React, { FC, useState } from "react";
import clsx from "clsx";

type Props = {
  labels: string[];
  className?: string;
};

const Tabs: FC<Props> = ({ labels, className }) => {
  const [selectedLabel, setSelectedLabel] = useState<string>(labels[0]);

  return (
    <div className={clsx("btn-group", className)}>
      {labels.map((label, index) => (
        <button
          className={clsx("btn", label === selectedLabel && "btn-active")}
          onClick={() => setSelectedLabel(label)}
          key={index}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
