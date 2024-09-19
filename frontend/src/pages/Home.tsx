import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to My Portfolio</h1>
      <p className="text-xl mb-8">I'm a software developer passionate about creating amazing web applications.</p>
      <button className="bg-openai-hover text-white px-6 py-3 rounded-md hover:bg-opacity-80 transition duration-300">
        View My Work
      </button>
    </div>
  );
}

export default Home; 