import React from "react";
import DevIcon from "./DevIcon";

interface DevIconGroupProps {
  isHovered: boolean;
  icons: { content: string; iconClass?: string; customIcon?: string }[];
}

const DevIconGroup: React.FC<DevIconGroupProps> = ({ isHovered, icons }) => {
  return (
    <ul className="text-center text-2xl flex mt-4 gap-3 flex-wrap mt-6 text-zinc-300">
      {icons.map((icon, index) => (
        <DevIcon
          key={index}
          content={icon.content}
          iconClass={icon.iconClass}
          isHovered={isHovered}
          customIcon={icon.customIcon}
        />
      ))}
    </ul>
  );
};

export default DevIconGroup;
