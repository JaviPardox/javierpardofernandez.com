import FadeOnScroll from "../../common/FadeOnScroll";
import InteractiveDashMesh from "../../common/InteractiveDashMesh";

const CVDownloadSection = () => {
    return (
        <FadeOnScroll variant="pop" flashy>
            <div className="relative text-center max-w-2xl mx-auto group/cv perspective-500">
                {/* 
            Container Box:
            - Default: Records-style 3D card (zinc-800/50, scale effects)
            - Hover: Solid Black (bg-black) with internal 3D mesh
            - 3D Effect: Scale up and perspective
        */}
                <div className="
          relative 
          rounded-2xl 
          border border-zinc-700/30 
          bg-zinc-800/50 
          group-hover/cv:bg-black
          overflow-hidden 
          shadow-xl 
          transition-all duration-500 ease-out
          transform 
          lg:group-hover/cv:scale-[1.02] 
          active:scale-[0.98]
        ">

                    {/* Internal 3D Mesh (visible on hover) */}
                    <div className="absolute inset-0 opacity-0 group-hover/cv:opacity-100 transition-opacity duration-700 delay-100 pointer-events-none">
                        <InteractiveDashMesh fullScreen={false} dashSpacing={30} className="z-0" />
                    </div>

                    {/* Content */}
                    <div className="relative py-8 px-4 md:px-6 z-10">
                        <p className="text-base md:text-lg text-zinc-300/90 group-hover/cv:text-zinc-100 transition-colors duration-500 mb-4 font-medium">
                            Need a CV? Don't worry, I've got you covered.
                        </p>
                        <a
                            className="
                inline-flex items-center justify-center 
                rounded-md py-2 px-4 text-sm font-medium 
                bg-zinc-700/50 text-zinc-200 
                border border-zinc-600/30
                transition-all duration-300 
                hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-100 hover:scale-105 active:scale-95
                group-hover/cv:bg-zinc-800/80 group-hover/cv:text-white group-hover/cv:border-zinc-500
              "
                            href="/files/cv.pdf"
                            download="Javier Pardo Fernández - CV.pdf"
                        >
                            <span>Download CV</span>
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                className="ml-2 h-4 w-4 stroke-current transition-transform duration-300 group-hover:translate-y-0.5"
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
                </div>
            </div>
        </FadeOnScroll>
    );
};

export default CVDownloadSection;
