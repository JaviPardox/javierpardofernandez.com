import AvatarImage from "./AvatarImage";
import SocialIconRow from "./SocialIconRow";

const Intro = () => {
  return (
    <>
      <div className="pb-0">
        <div className="h-16 w-16 rounded-full backdrop-blur bg-zinc-800/90 ring-2 ring-white/50">
          <a href="/">
            <AvatarImage />
          </a>
        </div>
      </div>
      <div className="max-w-2xl" id="home">
        <h1 className="text-4xl sm:text-4.82xl mb-6 mt-7 text-zinc-100 font-inter font-bold tracking-tight leading-[2.5rem] sm:leading-[3.5rem]">
          Software Engineer, Full-Stack Developer, MSc Project Management.
        </h1>
        <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
          I'm Javier, a Software Engineer based in Oslo, Norway. I specialize in software and web development, 
          with expertise in architecture, testing, and performance optimization. Currently working at Bio-Me, 
          where I develop and maintain microbiome profiling software solutions while driving innovation and 
          efficiency.
        </p>
        <SocialIconRow />
      </div>
    </>
  );
};

export default Intro;
