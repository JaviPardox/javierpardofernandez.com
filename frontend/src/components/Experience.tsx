import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { startLoading, finishLoading, setError } from '../store/loadingSlice';
import DevIconGroup from "./DevIconGroup";
import HashtagList from "./HashtagList";
import BriefcaseIconWork from "./BriefcaseIconWork";
import CompanyAndDateInfo from "./CompanyAndDateInfo";
import JobTitleAndDescription from "./JobTitleAndDescription";
import axios from "axios";
import { WorkExperience } from "../types";

const ExperienceSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [workExperience, setWorkExperience] = useState<WorkExperience | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const resourceId: string = 'experience-section';

  useEffect(() => {
    const fetchExperience = async () => {
      dispatch(startLoading(resourceId));
      try {
        const response = await axios.get<WorkExperience>(
          "http://localhost:8000/job-info"
        );
        setWorkExperience(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching experience:", error);
        dispatch(setError({
          resource: resourceId, 
          error: "Failed to fetch job experience. Please try again later." 
        }));
        setErrorMessage((error as Error).message);
        setLoading(false);
      } finally {
        dispatch(finishLoading(resourceId));
      }
    };

    fetchExperience();

    // Cleanup function
    // In case component stops mounting
    return () => {
      dispatch(finishLoading(resourceId));
    };
    
  }, [dispatch]);

  if (loading)
    return <div className="text-center">Loading job experience...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!workExperience)
    return (
      <div className="text-red-500 text-center">
        Error - Data fetching not executed
      </div>
    );

  return (
    <div className="md:border-l md:pl-6 md:border-zinc-700/40">
      <div className="flex flex-col space-y-12 md:space-y-16">
        {workExperience.data.map((experience, index) => (
          <article className="lg:grid md:grid-cols-4 lg:items-baseline">
            <div className="relative">
              <BriefcaseIconWork />
              <CompanyAndDateInfo info={experience.companyAndDateInfo} />
            </div>
            <div
              key={index} // Good for react optimization
              className="md:col-span-3 group relative flex flex-col items-start"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="hidden lg:block absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></span>
              <JobTitleAndDescription
                position={experience.jobPosition}
                description={experience.jobDescription}
              />
              <HashtagList items={experience.hashtags} />
              <DevIconGroup
                isHovered={hoveredIndex === index}
                icons={experience.icons}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
