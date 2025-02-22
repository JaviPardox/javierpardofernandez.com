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
          Software Engineer, MSc Project Management.
        </h1>
        <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
          I'm Javier, a Software Engineer based in Oslo, Norway, with a knack for building innovative and scalable software systems. 
          My work encompasses architecture engineering, high-performance computing, and the integration of technologies. 
          Beyond the technical realm, I like to learn about investing and financial markets, I'm a devoted FC Barcelona fan, and I enjoy both the serenity of nature and the thrill of cars and motorcycles. 
          I have a deep appreciation for history, cultures, and music. I like to stay curious and always learn new things!
        </p>
        <SocialIconRow />
      </div>
    </>
  );
};

export default Intro;
