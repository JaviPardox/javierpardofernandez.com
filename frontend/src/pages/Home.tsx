import CardCarrousel from "../components/home/carrousel/CardCarrousel";
import WhatIOfferList from "../components/home/offer/WhatIOfferList";
import ExperienceSection from "../components/home/experience/Experience";
import RecordsSection from "../components/home/records/Records";
import Intro from "../components/home/intro/Intro";
import TypingTitle from "../components/common/TypingTitle";
import { experienceTitle, offerTitle } from "../constants/titles";


const Home = () => {

  return (
    <div className="text-left xl:px-8">
      <div className="mt-[calc(theme(spacing.16)-theme(spacing.3))] pb-10"></div>
      <Intro />
      <div className="mt-16 sm:mt-20">
        <CardCarrousel />
      </div>
      <div className="mt-24 md:mt-28" id="offer">
        <TypingTitle text={offerTitle} variant="default"/>
        <WhatIOfferList />
      </div>
      <div className="mt-24 md:mt-28" id="experience">
        <TypingTitle text={experienceTitle} variant="experience"/>
        <ExperienceSection />
      </div>
      <div className="mt-24 md:mt-28" id="records">
        <RecordsSection />
      </div>
    </div>
  );
};

export default Home;
