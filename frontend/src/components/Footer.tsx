import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="">
      <div className="bg-openai-dark text-openai-light flex justify-center">
        <div className="bg-openai-center-content w-full max-w-[76rem] min-w-[20rem] sm:mx-[5%] relative pb-16 pt-10">
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-200">
                    <a className="transition hover:text-teal-400" href="/about">
                      About
                    </a>
                    <a
                      className="transition hover:text-teal-400"
                      href="/projects"
                    >
                      Projects
                    </a>
                    <a
                      className="transition hover:text-teal-400"
                      href="/speaking"
                    >
                      Speaking
                    </a>
                    <a className="transition hover:text-teal-400" href="/uses">
                      Uses
                    </a>
                  </div>
                  <p className="text-sm text-zinc-500">
                    © 2024 Javier Pardo Fernandez. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
