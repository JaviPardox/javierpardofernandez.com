import CardCarrousel from "../components/home/carrousel/CardCarrousel";
import WhatIOfferList from "../components/home/offer/WhatIOfferList";
import ExperienceSection from "../components/home/experience/Experience";
import RecordsSection from "../components/home/records/Records";
import Intro from "../components/home/intro/Intro";
import TypingTitle from "../components/common/TypingTitle";
import FadeOnScroll from "../components/common/FadeOnScroll";
import ScrollSection from "../components/common/ScrollSection";
import { experienceTitle, offerTitle } from "../constants/titles";


const Home = () => {
  // Scrolljacking removed - was causing scroll interference

  return (
    <div className="text-left xl:px-8">
      <div className="mt-[calc(theme(spacing.28)-theme(spacing.3))] pb-10"></div>

      {/* Intro Section - Fade in */}
      <ScrollSection
        variant="fade"
        enableScrolljack={true}
        duration={0.8}
      >
        <Intro />
      </ScrollSection>

      {/* Carousel Section - Individual cards animate separately */}
      <ScrollSection
        className="mt-14 sm:mt-18"
        variant="none"
        enableScrolljack={true}
      >
        <CardCarrousel />
      </ScrollSection>

      {/* What I Offer Section - Individual items animate separately */}
      <ScrollSection
        className="mt-24 md:mt-28"
        id="offer"
        variant="none"
        enableScrolljack={true}
      >
        <FadeOnScroll variant="slide-up" flashy>
          <TypingTitle text={offerTitle} variant="default" />
        </FadeOnScroll>
        <WhatIOfferList />
      </ScrollSection>

      {/* Experience Section - Individual entries animate separately */}
      <ScrollSection
        className="mt-24 md:mt-28"
        id="experience"
        variant="none"
        enableScrolljack={false}
      >
        <FadeOnScroll variant="slide-up" flashy>
          <TypingTitle key="experience-title" text={experienceTitle} variant="experience" />
        </FadeOnScroll>
        <ExperienceSection />
      </ScrollSection>

      {/* Records Section - Individual items animate separately */}
      <ScrollSection
        className="mt-24 md:mt-28"
        id="records"
        variant="none"
        enableScrolljack={true}
      >
        <RecordsSection />
      </ScrollSection>

      {/* CV Download Section - Fade with parallax */}
      <ScrollSection
        className="mt-24 md:mt-28 mb-8"
        id="cv"
        variant="fade"
        parallax={true}
        parallaxStrength={0.1}
        enableScrolljack={true}
      >
        <FadeOnScroll variant="pop" flashy>
          <div className="text-center">
            <p className="text-lg text-zinc-400 mb-4">
              Need a CV? Don't worry, I've got you covered.
            </p>
            <a
              className="rainbow-button inline-flex items-center justify-center rounded-md py-2 px-4 text-sm outline-offset-2 transition active:transition-none font-medium"
              href="/files/cv.pdf"
              download="Javier Pardo Fernández - CV.pdf"
            >
              <span className="rainbow-text">Download CV</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="ml-1 h-4 w-4 stroke-zinc-400 transition group-hover:stroke-zinc-50 group-active:stroke-zinc-50"
              >
                <path
                  d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </FadeOnScroll>
      </ScrollSection>
    </div>
  );
};

export default Home;

