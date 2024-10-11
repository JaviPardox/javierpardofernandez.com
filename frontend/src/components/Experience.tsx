import React, { useState, useEffect } from "react";
import DevIconGroup from "./DevIconGroup";
import HashtagList from "./HashtagList";
import BriefcaseIconWork from "./BriefcaseIconWork";
import CompanyAndDateInfo from "./CompanyAndDateInfo";
import JobTitleAndDescription from "./JobTitleAndDescription";
import axios from 'axios';
import { WorkExperienceItem } from '../types';

const ExperienceSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [experience, setExperience] = useState<WorkExperienceItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get<WorkExperienceItem>('http://localhost:8000/job-info');
        setExperience(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching experience:', error);
        setError('Failed to fetch job experience. Please try again later.');
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) return <div className="text-center">Loading job experience...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!experience) return <div className="text-red-500 text-center">Error - Data fetching not executed</div>;

  return (
    <div className="md:border-l md:pl-6 md:border-zinc-700/40">
      <div className="flex flex-col space-y-12 md:space-y-16">
        <article className="lg:grid md:grid-cols-4 lg:items-baseline">
          <div className="relative">
            <BriefcaseIconWork />
            <CompanyAndDateInfo info={experience.companyAndDateInfo}/>
          </div>
          <div
            className="md:col-span-3 group relative flex flex-col items-start"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="hidden lg:block absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></span>
            <JobTitleAndDescription position={experience.jobPosition} description={experience.jobDescription} />
            <HashtagList items={experience.hashtags} />
            <DevIconGroup isHovered={isHovered} icons={experience.icons} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default ExperienceSection;
