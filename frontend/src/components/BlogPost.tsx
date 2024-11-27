import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BlogPost as BlogPostType, BlogContentBlock } from "../types/index";

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const backendPort = process.env.REACT_APP_BACKEND_PORT;
      const serverIP = process.env.REACT_APP_SERVER_IP;
      try {
        const response = await axios.get<BlogPostType>(
          `http://${serverIP}:${backendPort}/blog/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const renderBlock = (block: BlogContentBlock, index: number) => {
    switch (block.type) {
      case "small_title":
        return (
          <h2
            key={index}
            className="text-2xl font-inter text-zin-200 font-semibold pt-6"
          >
            {block.content}
          </h2>
        );
      case "text":
        return (
          <p key={index} className="mb-4 mt-8 leading-7 text-zinc-400">
            {block.content}
          </p>
        );
      case "image":
        return (
          <img
            key={index}
            src={block.content as string} // Ensure the content is treated as a string
            alt=""
            className="my-6 w-full rounded-lg"
          />
        );
      case "code_block":
        return (
          <pre
            key={index}
            className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-7"
          >
            <code>{block.content}</code>
          </pre>
        );
      case "dotted_list":
        return (
          <ul
            key={index}
            className="list-disc pl-5 py-6 my-4 text-zinc-400 space-y-4"
          >
            {(block.content as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case "numbered_list":
        return (
          <ol
            key={index}
            className="list-decimal pl-5 py-6 my-4 text-zinc-400 space-y-4"
          >
            {(block.content as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      default:
        return null; // Fallback for unknown types
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blog");
  };

  return (
    <article>
      <div className="text-left sm:px-8 ">
        <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))] pb-10"></div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!error && !loading && (
          <>
            <header className="flex justify-between items-center">
              <div className="sm:flex sm:items-center">
                <time className="order-first flex items-center text-base text-zinc-500 sm:mt-0 sm:mr-4">
                  <span className="h-4 w-0.5 rounded-full bg-zinc-500"></span>
                  <span className="ml-3">{post?.date}</span>
                </time>
              </div>

              <button
                onClick={handleClick}
                type="button"
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
                >
                  <path
                    d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </header>
            <h1 className="mt-6 text-4xl font-inter font-bold tracking-tight sm:text-5xl text-zinc-100">
              {post?.title}
            </h1>
            {post?.content_blocks.map((block, index) =>
              renderBlock(block, index)
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default BlogPost;
