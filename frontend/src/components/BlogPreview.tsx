import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPreview as BlogPreviewType } from '../types/index';

interface BlogPreviewProps {
  preview: BlogPreviewType;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ preview }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/articles/${preview.id}`);
    };
  
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline sm:px-0 px-4">
      <div className="md:col-span-3 group relative flex flex-col items-start md:ml-6 lg:ml-0">
        <h2 className="text-base font-semibold tracking-tight text-zinc-100">
          <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 rounded-2xl bg-zinc-800/50"></div>
          <button onClick={handleClick}>
            <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 rounded-2xl"></span>
            <span className="relative z-10">{preview.title}</span>
          </button>
        </h2>
        <time
          className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500 pl-3.5"
          dateTime={preview.date}
        >
          <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
            <span className="h-4 w-0.5 rounded-full bg-zinc-500"></span>
          </span>
          {preview.date}
        </time>
        <p className="relative z-10 mt-2 text-sm text-zinc-400">
          {preview.preview_text}
        </p>
        <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
          Read article
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current">
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
      <time className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500">
        {preview.date}
      </time>
    </article>
  );
};

export default BlogPreview;
