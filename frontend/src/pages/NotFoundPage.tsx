import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 200);
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col text-center">
      <p className="text-base text-zinc-500 mb-7">
        404
      </p>
      <h1 className="text-4xl font-bold mb-4">
        Oops! This page doesn't exist.
      </h1>
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 mt-4"
      >
        Let's get you back home
      </button>
    </div>
  );
};

export default NotFoundPage;
