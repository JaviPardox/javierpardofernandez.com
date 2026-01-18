const Footer = () => {
  return (
    <footer className="">
      <div className="bg-openai-dark text-openai-light flex justify-center">
        <div className="bg-openai-center-content w-full max-w-[76rem] min-w-[20rem] relative sm:pb-10 pb-7">
          <div className="-mx-2 sm:-mx-6 lg:-mx-8 border-t border-zinc-300/20 sm:pt-10 pt-7" />
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative px-4 lg:px-12">
              <div className="mx-auto">
                <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 sm:flex-row">
                  <div className="flex items-center justify-center gap-x-3 sm:gap-x-6 text-sm font-medium text-zinc-200 w-full md:w-3/4 lg:w-2/5">
                    <a
                      className="contact-button inline-flex items-center justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none font-medium w-full"
                      href="mailto:javierpf000@gmail.com"
                    >
                      <span className="contact-text">Contact</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                  <div className="flex flex-col items-center sm:items-start lg:items-center lg:flex-row lg:gap-x-2 text-sm text-zinc-500">
                    <p>© 2025 Javier Pardo Fernández</p>
                    <p>All rights reserved.</p>
                  </div>
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
