import React from 'react';

interface JobTitleAndDescriptionProps {
  position: string;
  description: string[];
}

const JobTitleAndDescription: React.FC<JobTitleAndDescriptionProps> = ({ position, description }): JSX.Element => {
  return (
    <div>
      <h2 className="text-base font-semibold tracking-tight text-zinc-100">
        {position}
      </h2>
      <div className="mt-2 text-sm text-zinc-400 space-y-6">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default JobTitleAndDescription;
