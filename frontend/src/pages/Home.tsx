import React from "react";
import SocialIcon from "../components/SocialIcon";
import Card from "../components/Card";
import AvatarImage from "../components/AvatarImage";
import WhatIOfferList from "../components/WhatIOfferList";

const Home: React.FC = () => {
  return (
    <div className="text-left px-8">
      <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"></div>
      <div className="pb-0">
        <a
          className="h-16 w-16 rounded-full backdrop-blur bg-zinc-800/90 ring-white/10"
          href="/"
        >
          <AvatarImage />
        </a>
      </div>
      <div className="max-w-2xl">
        <h1 className="text-4.82xl mb-6 mt-7 text-zinc-100 font-inter font-bold tracking-tight leading-[3.5rem]">
          Software designer, founder, and amateur astronaut.
        </h1>
        <p className="mt-6 text-base text-zinc-400 leading-relaxed leading-[1.78rem]">
          I'm Spencer, a software designer and entrepreneur based in New York
          City. I'm the founder and CEO of Planetaria, where we develop
          technologies that empower regular people to explore space on their own
          terms.
        </p>
        <div className="mt-6 flex gap-6">
          <SocialIcon
            href="#"
            ariaLabel="Follow on X"
            iconPaths={[
              {
                d: "M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z",
              },
            ]}
          />
          <SocialIcon
            href="#"
            ariaLabel="Follow on Instagram"
            iconPaths={[
              {
                d: "M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z",
              },
              {
                d: "M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z",
              },
            ]}
          />
          <SocialIcon
            href="#"
            ariaLabel="Follow on Github"
            iconPaths={[
              {
                d: "M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z",
                fillRule: "evenodd",
                clipRule: "evenodd",
              },
            ]}
          />
          <SocialIcon
            href="#"
            ariaLabel="Follow on LinkedIn"
            iconPaths={[
              {
                d: "M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z",
              },
            ]}
          />
        </div>
      </div>
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5 py-4 sm:gap-8">
          <Card rotation={2} imageFolder="/img/avatar" imageName="avatar" />
          <Card
            rotation={-2}
            imageFolder="/img/cards/card1"
            imageName="card1"
          />
          <Card rotation={2} imageFolder="/img/cards/card2" imageName="card2" />
          <Card rotation={2} imageFolder="/img/cards/card3" imageName="card3" />
          <Card
            rotation={-2}
            imageFolder="/img/cards/card4"
            imageName="card4"
          />
        </div>
      </div>
      <div className="mt-24 md:mt-28">
        <h2 className="relative text-4xl mb-6 mt-7 text-zinc-100 font-inter font-semibold tracking-tight leading-[3.5rem]">
          What I can offer
          <span className="absolute inset-x-0 -bottom-[0rem] h-[1.5px] bg-gradient-to-r from-zinc-800/90 via-zin-800/90 to-zinc-800/90 ease-in-out"></span>
        </h2>
        <WhatIOfferList />
      </div>
      <div className="mt-24 md:mt-28">
        <h2 className="relative text-4xl mb-6 mt-7 text-zinc-100 font-inter font-semibold tracking-tight leading-[3.5rem]">
          My experience so far
          <span className="absolute inset-x-0 -bottom-[0rem] h-[1.5px] bg-gradient-to-r from-zinc-800/90 via-zin-800/90 to-zinc-800/90 ease-in-out"></span>
        </h2>
        <div className="md:border-l md:pl-6 md:border-zinc-700/40">
          <div className="flex flex-col space-y-12 md:space-y-16">
            <article className="lg:grid md:grid-cols-4 lg:items-baseline">
              <div className="relative">
                <span className="absolute w-6 h-6 hidden md:flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800 left-[-36px] top-[2px]">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="briefcase"
                    className="svg-inline--fa fa-briefcase w-3 h-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"
                    ></path>
                  </svg>
                </span>
                <a target="_blank" href="https://fabrity.com">
                  <h3 className="text-base tracking-tight text-zinc-400 font-semibold hover:text-teal-500 cursor-pointer transition-colors">
                    FABRITY
                  </h3>
                </a>
                <time className="mt-1 md:block mb-3 flex items-center text-sm text-zinc-500 relative">
                  March 2022 - Present
                </time>
              </div>
              <div className="md:col-span-3 group relative flex flex-col items-start">
                <span className="hidden lg:block absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></span>
                <h2 className="text-base font-semibold tracking-tight text-zinc-100">
                  Software Architect
                </h2>
                <div className="mt-2 text-sm text-zinc-400 space-y-6">
                  <p>
                    As a lead software architect for FastAPP, a low-code
                    enterprise platform I help product owners translate their
                    business requirements into clean, robust and extensible
                    technical solutions.
                  </p>
                  <p>
                    As a competence leader in area of .NET I help backend
                    programmers hone their skills by supporting them in their
                    everyday work.
                  </p>
                  <p>
                    As a leader of an internal knowledge sharing programme I
                    organize monthly meetings, where passion-driven people can
                    share their knowledge with the rest of the company.
                  </p>
                  <p>
                    Furthermore I do technical interviews and serve as a
                    conference speaker on behalf of Fabrity.
                  </p>
                </div>
                <ul className="mt-6 gap-1 md:gap-2 flex flex-wrap">
                  <li>
                    <span className="uppercase text-xs font-semibold bg-gradient-to-r from-teal-800 to-teal-400 px-1.5 py-0.5 rounded-md bg-none bg-zinc-700 inline-block">
                      #Leadership
                    </span>
                  </li>
                  <li>
                    <span className="uppercase text-xs font-semibold bg-gradient-to-r from-teal-800 to-teal-400 px-1.5 py-0.5 rounded-md bg-none bg-zinc-700 inline-block">
                      #Architecture
                    </span>
                  </li>
                  <li>
                    <span className="uppercase text-xs font-semibold bg-gradient-to-r from-teal-800 to-teal-400 px-1.5 py-0.5 rounded-md bg-none bg-zinc-700 inline-block">
                      #Backend
                    </span>
                  </li>
                  <li>
                    <span className="uppercase text-xs font-semibold bg-gradient-to-r from-teal-800 to-teal-400 px-1.5 py-0.5 rounded-md bg-none bg-zinc-700 inline-block">
                      #Frontend
                    </span>
                  </li>
                </ul>
                <ul className="text-center text-2xl flex mt-4 gap-3 flex-wrap mt-6">
                  <i
                    data-tooltip-id="1085"
                    data-tooltip-content=".NET 6"
                    className="devicon-dotnetcore-plain transition-colors hover:colored"
                  ></i>
                  <i
                    data-tooltip-id="1086"
                    data-tooltip-content=".NET Framework 4.7.2"
                    className="devicon-dot-net-plain transition-colors"
                  ></i>
                  <i
                    data-tooltip-id="1087"
                    data-tooltip-content="MS SQL Server 2019"
                    className="devicon-microsoftsqlserver-plain transition-colors"
                  ></i>
                  <i
                    data-tooltip-id="1088"
                    data-tooltip-content="React 16"
                    className="devicon-react-plain transition-colors"
                  ></i>
                  <i
                    data-tooltip-id="1089"
                    data-tooltip-content="Redux"
                    className="devicon-redux-plain transition-colors"
                  ></i>
                  <i
                    data-tooltip-id="1090"
                    data-tooltip-content="SCSS"
                    className="devicon-sass-plain transition-colors"
                  ></i>
                  <i
                    data-tooltip-id="1091"
                    data-tooltip-content="Bootstrap 3"
                    className="devicon-bootstrap-plain transition-colors"
                  ></i>
                  <i
                    data-tooltip-id="1092"
                    data-tooltip-content="Webpack"
                    className="devicon-webpack-plain transition-colors"
                  ></i>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
