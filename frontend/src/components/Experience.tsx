import React, { useState } from "react";
import DevIconGroup from "./DevIconGroup";
import HashtagList from "./HashtagList";
import BriefcaseIconWork from "./BriefcaseIconWork";
import CompanyAndDateInfo from "./CompanyAndDateInfo";
import JobTitleAndDescription from "./JobTitleAndDescription";

const ExperienceSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const hashtags = ["Leadership", "Architecture", "Backend", "Frontend"];

  const icons = [
    {
      tooltipId: "1085",
      content: ".NET 6",
      iconClass: "devicon-dotnetcore-plain",
    },
    {
      tooltipId: "1086",
      content: ".NET Framework 4.7.2",
      iconClass: "devicon-dot-net-plain",
    },
    {
      tooltipId: "1087",
      content: "MS SQL Server 2019",
      iconClass: "devicon-microsoftsqlserver-plain",
    },
    {
      tooltipId: "1088",
      content: "React 16",
      iconClass: "devicon-react-plain",
    },
    { tooltipId: "1089", content: "Redux", iconClass: "devicon-redux-plain" },
  ];

  const companyAndDateInfo = {
    url: "https://fabrity.com",
    companyName: "FABRITY",
    date: "March 2022 - Present"
  };

  const jobPosition = "Software Architect";
  const jobDescription = [
    "As a lead software architect for FastAPP, a low-code enterprise platform I help product owners translate their business requirements into clean, robust and extensible technical solutions.",
    "As a competence leader in the area of .NET, I help backend programmers hone their skills by supporting them in their everyday work.",
    "As a leader of an internal knowledge-sharing programme, I organize monthly meetings where passion-driven people can share their knowledge with the rest of the company.",
    "Furthermore, I do technical interviews and serve as a conference speaker on behalf of Fabrity."
  ];

  return (
    <div className="md:border-l md:pl-6 md:border-zinc-700/40">
      <div className="flex flex-col space-y-12 md:space-y-16">
        <article className="lg:grid md:grid-cols-4 lg:items-baseline">
          <div className="relative">
            <BriefcaseIconWork />
            <CompanyAndDateInfo info={companyAndDateInfo}/>
          </div>
          <div
            className="md:col-span-3 group relative flex flex-col items-start"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="hidden lg:block absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></span>
            <JobTitleAndDescription position={jobPosition} description={jobDescription} />
            <HashtagList items={hashtags} />
            <DevIconGroup isHovered={isHovered} icons={icons} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default ExperienceSection;
