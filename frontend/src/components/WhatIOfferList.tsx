import React from 'react';
import WhatIOfferListItem from './WhatIOfferListItem';
import { FaTools, FaCode, FaFire, FaChartLine, FaCommentAlt, FaLightbulb } from 'react-icons/fa';

const WhatIOfferList: React.FC = () => {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16 sm:grid-cols-2 lg:grid-cols-3 text-zinc-400 mt-10">
      <WhatIOfferListItem
        icon={<FaTools className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
        title="Full-Stack Prowess"
        description="I am equally comfortable on the front-end and back-end, ensuring seamless web applications from start to finish."
      />
      <WhatIOfferListItem
        icon={<FaCode className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
        title="Clean Code Architect"
        description="I take pride in crafting elegant, efficient, and maintainable code that stands the test of time."
      />
      <WhatIOfferListItem
        icon={<FaFire className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
        title="Cutting-Edge Technologies"
        description="I stay up-to-date with the latest industry trends, so your projects are always powered by the most current tools and techniques."
      />
      <WhatIOfferListItem
        icon={<FaChartLine className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
        title="Results-Driven"
        description="My track record speaks for itself. I have consistently delivered high-impact solutions that drive business growth."
      />
      <WhatIOfferListItem
        icon={<FaCommentAlt className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
        title="Collaborative Team Player"
        description="Effective communication and teamwork are second nature to me, making me a valuable addition to any project."
      />
      <WhatIOfferListItem
        icon={<FaLightbulb className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
        title="Problem Solver"
        description="Complex challenges are my playground. I thrive on finding innovative solutions to make your vision a reality."
      />
    </ul>
  );
};

export default WhatIOfferList;