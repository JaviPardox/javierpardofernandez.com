import React from 'react';

interface IconProps {
  content: string;
  iconClass: string;
  isHovered: boolean;
}

const DevIcon: React.FC<IconProps> = ({ content, iconClass, isHovered }) => {
  return (
    <i
      data-tooltip-content={content}
      className={`${iconClass} transition-colors ${isHovered ? 'colored' : ''}`}
    ></i>
  );
};

export default DevIcon;