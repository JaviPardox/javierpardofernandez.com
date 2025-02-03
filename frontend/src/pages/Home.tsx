import CardCarrousel from "../components/home/carrousel/CardCarrousel";
import WhatIOfferList from "../components/home/offer/WhatIOfferList";
import ExperienceSection from "../components/home/experience/Experience";
import RecordsSection from "../components/home/records/Records";
import Intro from "../components/home/intro/Intro";

const Home = () => {
  return (
    <div className="text-left xl:px-8">
      <div className="mt-[calc(theme(spacing.16)-theme(spacing.3))] pb-10"></div>
      <Intro />
      <div className="mt-16 sm:mt-20">
        <CardCarrousel />
      </div>
      <div className="mt-24 md:mt-28" id="offer">
        <h2 className="relative text-4xl mb-6 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
          <span className="keyword">function</span>{" "}
          <span className="function-name">WhatIOffer</span>
          <span className="parentheses">&#40;&#41;</span>
          <span className="lg:hidden">
            <br />
          </span>
          <span className="braces">&#123;</span>
          <span className="keyword">return</span>{" "}
          <span className="string">&quot;Expertise&quot;</span>
          <span className="semicolon">;</span>
          <span className="braces">&#125;</span>
          <span className="cursor"></span>
        </h2>
        <WhatIOfferList />
      </div>
      <div className="mt-24 md:mt-28" id="experience">
        <h2 className="relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
          <span className="keyword">class</span>{" "}
          <span className="class-name">Experience</span>
          <span className="parentheses">:</span>
          <br />
          &nbsp;&nbsp;<span className="keyword">def</span>{" "}
          <span className="function-name">__init__</span>
          <span className="parentheses">&#40;self&#41;</span>:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">super</span>
          <span className="parentheses">&#40;&#41;</span>
          <span className="cursor"></span>
        </h2>
        <ExperienceSection />
      </div>
      <div className="mt-24 md:mt-28" id="records">
          <RecordsSection />
      </div>
    </div>
  );
};

export default Home;
