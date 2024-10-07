import React from "react";
import SocialIcon from "../components/SocialIcon";
import Card from "../components/Card";
import AvatarImage from "../components/AvatarImage";

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
        <h2 className="text-4xl mb-6 mt-7 text-zinc-100 font-inter font-bold tracking-tight leading-[3.5rem]">
          What I can offer
        </h2>
        <ul className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16 sm:grid-cols-2 lg:grid-cols-3 text-zinc-400 mt-8">
          <li className="relative group flex flex-col items-start">
            <span className="absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></span>
            <i className="w-12 h-12 flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="screwdriver-wrench"
                className="svg-inline--fa fa-screwdriver-wrench w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                ></path>
              </svg>
            </i>
            <h2 className="text-zinc-100 mt-4 md:mt-6 text-base font-semibold">
              Full-Stack Prowess
            </h2>
            <p className="mt-2 text-sm">
              I am equally comfortable on the front-end and back-end, ensuring
              seamless web applications from start to finish.
            </p>
          </li>
          <li className="relative group flex flex-col items-start">
            <span className="absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></span>
            <i className="w-12 h-12 flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="code"
                className="svg-inline--fa fa-code w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
                ></path>
              </svg>
            </i>
            <h2 className="text-zinc-100 mt-4 md:mt-6 text-base font-semibold">
              Clean Code Architect
            </h2>
            <p className="mt-2 text-sm">
              I take pride in crafting elegant, efficient, and maintainable code
              that stands the test of time.
            </p>
          </li>
          <li className="relative group flex flex-col items-start">
            <span className="absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></span>
            <i className="w-12 h-12 flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="fire"
                className="svg-inline--fa fa-fire w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"
                ></path>
              </svg>
            </i>
            <h2 className="text-zinc-100 mt-4 md:mt-6 text-base font-semibold">
              Cutting-Edge Technologies
            </h2>
            <p className="mt-2 text-sm">
              I stay up-to-date with the latest industry trends, so your
              projects are always powered by the most current tools and
              techniques.
            </p>
          </li>
          <li className="relative group flex flex-col items-start">
            <span className="absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></span>
            <i className="w-12 h-12 flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chart-line"
                className="svg-inline--fa fa-chart-line w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"
                ></path>
              </svg>
            </i>
            <h2 className="text-zinc-100 mt-4 md:mt-6 text-base font-semibold">
              Results-Driven
            </h2>
            <p className="mt-2 text-sm">
              My track record speaks for itself. I have consistently delivered
              high-impact solutions that drive business growth.
            </p>
          </li>
          <li className="relative group flex flex-col items-start">
            <span className="absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></span>
            <i className="w-12 h-12 flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="message"
                className="svg-inline--fa fa-message w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"
                ></path>
              </svg>
            </i>
            <h2 className="text-zinc-100 mt-4 md:mt-6 text-base font-semibold">
              Collaborative Team Player
            </h2>
            <p className="mt-2 text-sm">
              Effective communication and teamwork are second nature to me,
              making me a valuable addition to any project.
            </p>
          </li>
          <li className="relative group flex flex-col items-start">
            <span className="absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></span>
            <i className="w-12 h-12 flex items-center justify-center ring-1 ring-zinc-900/5 border border-zinc-700/50 rounded-full bg-zinc-800">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="lightbulb"
                className="svg-inline--fa fa-lightbulb w-5 h-5 text-zinc-100 group-hover:text-teal-500 transition-colors"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"
                ></path>
              </svg>
            </i>
            <h2 className="text-zinc-100 mt-4 md:mt-6 text-base font-semibold">
              Problem Solver
            </h2>
            <p className="mt-2 text-sm">
              Complex challenges are my playground. I thrive on finding
              innovative solutions to make your vision a reality.
            </p>
          </li>
        </ul>
      </div>
      <button className="bg-openai-hover text-white px-6 py-3 rounded-md hover:bg-opacity-80 transition duration-300">
        View My Work
      </button>
    </div>
  );
};

export default Home;
