import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';


interface IconProps {
  content: string;
  iconClass: string;
  isHovered: boolean;
}


const DevIcon: React.FC<IconProps> = ({ content, iconClass, isHovered }) => {

  return (
    <>
      <i
        data-tooltip-id={`tooltip-${content}`}
        data-tooltip-delay-show={200}
        className={`${iconClass} transition-colors ${isHovered ? 'colored' : ''}`}
      ></i>
      <ReactTooltip
        id={`tooltip-${content}`}  // Set the tooltip id to match data-tooltip-id
        content={content}
        place="top"
        className="custom-tooltip"
        classNameArrow="custom-tooltip-arrow"
      />
    </>
  );
};

export default DevIcon;