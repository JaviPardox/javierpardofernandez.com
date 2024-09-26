import React from "react";

const Home: React.FC = () => {
  return (
    <div className="text-left px-8">
      <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"></div>
      <div className="pb-0">
        <div className="h-16 w-16 rounded-full ring-1 backdrop-blur bg-zinc-800/90 ring-white/10">
          {/* Your image goes here */}
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-6 mt-9 text-zinc-100">Welcome to My Portfolio</h1>
      <p className="text-xl mb-8">
        I'm a software developer passionate about creating amazing web
        applications.
      </p>
      <button className="bg-openai-hover text-white px-6 py-3 rounded-md hover:bg-opacity-80 transition duration-300">
        View My Work
      </button>
    </div>
  );
};

export default Home;
