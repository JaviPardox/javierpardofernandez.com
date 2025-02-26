import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { startLoading, finishLoading, setError } from '../../../store/loadingSlice';
import DevIconGroup from "./DevIconGroup";
import HashtagList from "./HashtagList";
import BriefcaseIconWork from "./BriefcaseIconWork";
import CompanyAndDateInfo from "./CompanyAndDateInfo";
import JobTitleAndDescription from "./JobTitleAndDescription";
import axios from "axios";
import { WorkExperience } from "../../../types";

const ExperienceSection = () => {
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
      const backendPort = process.env.REACT_APP_BACKEND_PORT;
      const serverIP = process.env.REACT_APP_SERVER_IP;
      dispatch(startLoading(resourceId));

      try {
        const response = await axios.get<WorkExperience>(
          `http://${serverIP}:${backendPort}/job-info`
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
    return (<div className="flex justify-center items-center pt-[15vh]">
      <div
        className="w-16 h-16 border-8 rounded-full animate-spin"
        style={{
          borderColor: "transparent",
          borderTopColor: "rgba(20, 184, 166, 0.7)",
          borderRightColor: "rgba(13, 148, 136, 0.9)",
          borderBottomColor: "rgba(19, 78, 74, 1)",
        }}
      ></div>
    </div>);
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!workExperience)
    return (
      <div className="text-red-500 text-center">
        Error - Data fetching not executed
      </div>
    );

  return (
    <div className="md:border-l md:pl-6 md:border-zinc-700/40 mt-12">
      <div className="flex flex-col space-y-12 md:space-y-16">
        {workExperience.data.map((experience, index) => (
          <article 
            key={index}
            className="lg:grid md:grid-cols-4 lg:items-baseline"
          >
            <div className="relative">
              <BriefcaseIconWork />
              <CompanyAndDateInfo info={experience.companyAndDateInfo} />
            </div>
            <div
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
