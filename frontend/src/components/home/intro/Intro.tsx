import AvatarImage from "./AvatarImage";
import SocialIconRow from "./SocialIconRow";
import FadeOnScroll from "../../common/FadeOnScroll";
import AnimatedText from "../../common/AnimatedText";

const Intro = () => {
  return (
    <>
      <FadeOnScroll className="pb-0" variant="pop" delay={0.8} flashy>
        <div className="h-16 w-16 rounded-full backdrop-blur bg-zinc-800/90 ring-2 ring-white/50">
          <a href="/">
            <AvatarImage imageId="avatar1" />
          </a>
        </div>
      </FadeOnScroll>
      <div className="max-w-2xl" id="home">
        {/* Headline with word-by-word animation */}
        <AnimatedText
          text="Software Engineer. Building Solutions That Work."
          as="h1"
          type="words"
          staggerDelay={0.04}
          delay={1.0}
          className="text-4xl sm:text-4.82xl mb-6 mt-7 text-zinc-100 font-inter font-bold tracking-tight leading-[2.5rem] sm:leading-[3.5rem]"
        />

        <FadeOnScroll variant="slide-up" delay={1.2} flashy>
          <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
            Hey, I'm Javier — a Software Engineer based in Oslo, Norway, who loves figuring out how everything works. For a living, that curiosity takes me from the software we write to the hardware we use every day.
          </p>
        </FadeOnScroll>
        <FadeOnScroll variant="slide-up" delay={1.3} flashy>
          <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
            I like building just about anything, but I have a special love for creating apps, engineering scalable systems, tinkering with high-performance computing, applying functional programming like it's a higher art form, and designing algorithms.
          </p>
        </FadeOnScroll>
        <FadeOnScroll variant="slide-up" delay={1.4} flashy>
          <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
            I enjoy connecting ideas across software, hardware, and IoT.
          </p>
        </FadeOnScroll>
        <FadeOnScroll variant="slide-up" delay={1.5} flashy viewportMargin="0px 0px 600px 0px">
          <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
            When I'm not deep in code, I'm usually outdoors or doing sports. I love playing football (though I keep wondering if I remember myself being faster), gathering with friends — especially if there is a paella involved — or suffering through another FC Barcelona match.
          </p>
        </FadeOnScroll>
        <FadeOnScroll variant="slide-up" delay={1.6} flashy viewportMargin="0px 0px 600px 0px">
          <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
            I'm fascinated by people, cars, motorcycles, engineering feats, markets, history, cultures, food (one day I'll visit all those saved spots on Google Maps, I promise), and music — and I like to think curiosity is my default state.
          </p>
        </FadeOnScroll>
        <FadeOnScroll variant="slide-up" delay={1.7} flashy viewportMargin="0px 0px 600px 0px">
          <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
            I'm also available for consulting and freelance projects. Whether you need help architecting a new system, optimizing your cloud infrastructure, or just want a second pair of eyes on your code — feel free to reach out.
          </p>
        </FadeOnScroll>
        <SocialIconRow delay={1.8} viewportMargin="0px 0px 100px 0px" />
      </div>
    </>
  );
};

export default Intro;

