import React from 'react';
import FadeOnScroll from '../../common/FadeOnScroll';

interface JobTitleAndDescriptionProps {
  position: string;
  description: string[];
}

const JobTitleAndDescription: React.FC<JobTitleAndDescriptionProps> = ({ position, description }): JSX.Element => {
  return (
    <div>
      <FadeOnScroll>
        <h2 className="text-base font-semibold tracking-tight text-zinc-100">
          {position}
        </h2>
      </FadeOnScroll>
      <div className="mt-2 text-sm text-zinc-400 space-y-6">
        {description.map((paragraph, index) => (
          <FadeOnScroll>
            <p key={index}>{paragraph}</p>
          </FadeOnScroll>
        ))}
      </div>
    </div>
  );
};

export default JobTitleAndDescription;
