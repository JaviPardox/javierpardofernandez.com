import React from 'react';
import { trackEvent } from '../../../lib/analytics';

interface CompanyAndDateProps {
  info: {
    url: string;
    companyName: string;
    date: string;
  };
}

const CompanyAndDateInfo: React.FC<CompanyAndDateProps> = ({ info }): JSX.Element => {
  return (
    <div>
      <a
        target="_blank"
        href={info.url}
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent('company_click', { company: info.companyName })
        }
      >
        <h3 className="text-base tracking-tight text-zinc-400 font-semibold hover:text-teal-500 cursor-pointer transition-colors">
          {info.companyName}
        </h3>
      </a>
      <time className="mt-1 md:block mb-3 flex items-center text-sm text-zinc-500 relative">
        {info.date}
      </time>
    </div>
  );
};

export default CompanyAndDateInfo;