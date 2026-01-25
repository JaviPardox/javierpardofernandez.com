import WhatIOfferListItem from './WhatIOfferListItem';
import { FaCloud, FaCode, FaTools, FaChartLine, FaUsers, FaLightbulb } from 'react-icons/fa';
import FadeOnScroll from "../../common/FadeOnScroll";

const WhatIOfferList = () => {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16 sm:grid-cols-2 lg:grid-cols-3 text-zinc-400 mt-10">
      <FadeOnScroll delay={0} variant="slide-up" flashy>
        <WhatIOfferListItem
          icon={<FaCloud className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
          title="Cloud & Infrastructure"
          description="Extensive experience with AWS and cloud infrastructure, improving system performance and cost-effectiveness through optimized solutions."
        />
      </FadeOnScroll>
      <FadeOnScroll delay={0.1} variant="slide-up" flashy>
        <WhatIOfferListItem
          icon={<FaCode className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
          title="Full-Stack Development"
          description="Advanced proficiency in Python, JavaScript, React, and various frameworks, delivering robust and scalable web applications."
        />
      </FadeOnScroll>
      <FadeOnScroll delay={0.2} variant="slide-up" flashy>
        <WhatIOfferListItem
          icon={<FaTools className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
          title="Testing & Optimization"
          description="Strong focus on software testing, bug fixing, and performance optimization, with proven track record of significant efficiency improvements."
        />
      </FadeOnScroll>
      <FadeOnScroll delay={0.3} variant="slide-up" flashy>
        <WhatIOfferListItem
          icon={<FaChartLine className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
          title="Project Management"
          description="Skilled in managing complex projects, implementing best practices, and driving continuous improvement in development processes."
        />
      </FadeOnScroll>
      <FadeOnScroll delay={0.4} variant="slide-up" flashy>
        <WhatIOfferListItem
          icon={<FaUsers className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
          title="Team Collaboration"
          description="Experience in cross-team collaboration, code review, and mentoring, fostering a culture of knowledge sharing and excellence."
        />
      </FadeOnScroll>
      <FadeOnScroll delay={0.5} variant="slide-up" flashy>
        <WhatIOfferListItem
          icon={<FaLightbulb className="w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors" />}
          title="Innovation Focus"
          description="Passionate about leveraging cutting-edge technologies and methodologies to solve complex problems and drive business growth."
        />
      </FadeOnScroll>
    </ul>
  );
};

export default WhatIOfferList;