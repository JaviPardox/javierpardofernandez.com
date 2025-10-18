import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';


interface IconProps {
  content: string;
  iconClass?: string;
  isHovered: boolean;
  customIcon?: string; // Path to custom SVG icon
}


const DevIcon: React.FC<IconProps> = ({ content, iconClass, isHovered, customIcon }) => {
  // Check if this is a custom icon
  const isCustomIcon = customIcon && customIcon.startsWith('/icons/');

  return (
    <>
      {isCustomIcon ? (
        <img
          src={customIcon}
          alt={content}
          data-tooltip-id={`tooltip-${content}`}
          data-tooltip-delay-show={200}
          className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
          style={{
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
            transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out'
          }}
        />
      ) : (
        <i
          data-tooltip-id={`tooltip-${content}`}
          data-tooltip-delay-show={200}
          className={`${iconClass} transition-colors ${isHovered ? 'colored' : ''}`}
        ></i>
      )}
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