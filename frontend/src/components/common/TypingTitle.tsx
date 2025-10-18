import { useMemo } from 'react';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';

interface TypingTitleProps {
  text: Record<string, string>;
  variant?: 'default' | 'experience';
}

const TypingTitle = ({ text, variant = 'default' }: TypingTitleProps) => {
  // Memoize the text to prevent unnecessary re-renders
  const memoizedText = useMemo(() => text, [JSON.stringify(text)]);
  const { displayedText, elementRef } = useTypingAnimation(memoizedText);

  const baseClasses = "relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto whitespace-pre-wrap";
  
  const variantClasses = {
    default: "md:whitespace-nowrap min-h-[132px] md:min-h-[3.5rem]",
    experience: "min-h-[188px]"
  };

  return (
    <h2 
      ref={elementRef}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {displayedText.map((item, index) => (
        <span key={index}>
          {Object.entries(item).map(([key, value]) => (
            <span key={key} className={value}>
              {key}
            </span>
          ))}
        </span>
      ))}
      <span className="cursor"></span>
    </h2>
  );
};

export default TypingTitle; 