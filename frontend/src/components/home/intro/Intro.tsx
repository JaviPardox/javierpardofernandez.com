import AvatarImage from "./AvatarImage";
import SocialIconRow from "./SocialIconRow";

const Intro = () => {
  return (
    <>
      <div className="pb-0">
        <div className="h-16 w-16 rounded-full backdrop-blur bg-zinc-800/90 ring-2 ring-white/50">
          <a href="/">
            <AvatarImage imageId="avatar1" />
          </a>
        </div>
      </div>
      <div className="max-w-2xl" id="home">
        <h1 className="text-4xl sm:text-4.82xl mb-6 mt-7 text-zinc-100 font-inter font-bold tracking-tight leading-[2.5rem] sm:leading-[3.5rem]">
          Software Engineer, MSc Project Management.
        </h1>
        <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
          Hey, I'm Javier — a Software Engineer based in Oslo, Norway, who loves figuring out how everything works. For a living, that curiosity takes me from the software we write to the hardware we use every day. <br />
          <br />
          I like building just about anything, but I have a special love for creating apps, engineering scalable systems, tinkering with high-performance computing, applying functional programming like it's a higher art form, and designing algorithms. <br />
          <br />
          I enjoy connecting ideas across software, hardware, and IoT — it's where curiosity meets creation. <br />
          <br />
          When I'm not deep in code, I'm usually outdoors or doing sports. I love playing football (though I keep wondering if I remember myself being faster), gathering with friends — especially if there is a paella involved — or suffering through another FC Barcelona match. <br />
          <br />
          I'm fascinated by people, cars, motorcycles, engineering feats, markets, history, cultures, food (one day I'll visit all those saved spots on Google Maps, I promise), and music — and I like to think curiosity is my default state.
        </p>
        <SocialIconRow />
      </div>
    </>
  );
};

export default Intro;
