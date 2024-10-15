import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';


interface IconProps {
  content: string;
  iconClass: string;
  isHovered: boolean;
}


const DevIcon: React.FC<IconProps> = ({ content, iconClass, isHovered }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <>
      <i
        data-tooltip-id={`tooltip-${content}`}  // Use data-tooltip-id
        className={`${iconClass} transition-colors ${isHovered ? 'colored' : ''}`}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      ></i>
      <ReactTooltip
        id={`tooltip-${content}`}  // Set the tooltip id to match data-tooltip-id
        content={content}
        place="top"
        className={`custom-tooltip ${isTooltipVisible ? 'show' : ''}`}
        classNameArrow="custom-tooltip-arrow"
        delayHide={300} 
      />
    </>
  );
};

export default DevIcon;