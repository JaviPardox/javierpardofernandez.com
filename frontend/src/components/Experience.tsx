import React, { useState } from 'react';
import DevIconGroup from './DevIconGroup';  // Import the IconGroup component
import HashtagList from './HashtagList';

const ExperienceSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const hashtags = ['Leadership', 'Architecture', 'Backend', 'Frontend'];

  const icons = [
    { tooltipId: "1085", content: ".NET 6", iconClass: "devicon-dotnetcore-plain" },
    { tooltipId: "1086", content: ".NET Framework 4.7.2", iconClass: "devicon-dot-net-plain" },
    { tooltipId: "1087", content: "MS SQL Server 2019", iconClass: "devicon-microsoftsqlserver-plain" },
    { tooltipId: "1088", content: "React 16", iconClass: "devicon-react-plain" },
    { tooltipId: "1089", content: "Redux", iconClass: "devicon-redux-plain" },
  ];

  return (
    <div className="md:border-l md:pl-6 md:border-zinc-700/40">
      <div className="flex flex-col space-y-12 md:space-y-16">
        <article className="lg:grid md:grid-cols-4 lg:items-baseline">
          <div className="relative">
            <span className="absolute w-6 h-6 hidden md:flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800 left-[-36px] top-[2px]">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="briefcase"
                className="svg-inline--fa fa-briefcase w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"
                ></path>
              </svg>
            </span>
            <a target="_blank" href="https://fabrity.com">
              <h3 className="text-base tracking-tight text-zinc-400 font-semibold hover:text-teal-500 cursor-pointer transition-colors">
                FABRITY
              </h3>
            </a>
            <time className="mt-1 md:block mb-3 flex items-center text-sm text-zinc-500 relative">
              March 2022 - Present
            </time>
          </div>
          <div className="md:col-span-3 group relative flex flex-col items-start"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
          >
            <span className="hidden lg:block absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></span>
            <h2 className="text-base font-semibold tracking-tight text-zinc-100">
              Software Architect
            </h2>
            <div className="mt-2 text-sm text-zinc-400 space-y-6">
              <p>
                As a lead software architect for FastAPP, a low-code enterprise
                platform I help product owners translate their business
                requirements into clean, robust and extensible technical
                solutions.
              </p>
              <p>
                As a competence leader in area of .NET I help backend
                programmers hone their skills by supporting them in their
                everyday work.
              </p>
              <p>
                As a leader of an internal knowledge sharing programme I
                organize monthly meetings, where passion-driven people can share
                their knowledge with the rest of the company.
              </p>
              <p>
                Furthermore I do technical interviews and serve as a conference
                speaker on behalf of Fabrity.
              </p>
            </div>
            <HashtagList items={hashtags} />
            <DevIconGroup isHovered={isHovered} icons={icons} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default ExperienceSection;
