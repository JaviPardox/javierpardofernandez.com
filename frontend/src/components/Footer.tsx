const Footer = () => {
  return (
    <footer className="">
      <div className="bg-openai-dark text-openai-light flex justify-center">
        <div className="bg-openai-center-content w-full max-w-[76rem] min-w-[20rem] sm:mx-[5%] relative pb-10 pt-10 sm:border-x sm:border-b sm:border-zinc-300/20">
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative px-4 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <div className="flex items-center justify-center gap-x-3 sm:gap-x-6 text-sm font-medium text-zinc-200 w-full md:w-3/4 lg:w-2/5">
                    <a
                      className="inline-flex items-center justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none font-medium bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 active:bg-zinc-800/50 active:text-zinc-50/70 w-full"
                      href="/files/cv.pdf"
                      download="Javier Pardo Fernández - Software Engineer - Resume.pdf"
                    >
                      Download CV
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="h-4 w-4 stroke-zinc-400 transition group-hover:stroke-zinc-50 group-active:stroke-zinc-50"
                      >
                        <path
                          d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                    <a
                      className="inline-flex items-center justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none font-medium bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 active:bg-zinc-800/50 active:text-zinc-50/70 w-full"
                      href="mailto:javierpf000@gmail.com"
                    >
                      Contact
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                        className="ml-1 h-4 w-4 flex-none"
                      >
                        <path
                          d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                          className="fill-zinc-100/10 stroke-zinc-500"
                        ></path>
                        <path
                          d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                          className="stroke-zinc-500"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <p className="text-right text-sm text-zinc-500">
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
