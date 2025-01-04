import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BlogPost as BlogPostType, BlogContentBlock } from "../types/index";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({});
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) {
      // Check if buttonRef.current is not null before accessing it
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        
        // Calculate the translation needed to move from current position to fixed position
        setButtonPosition({
          position: 'fixed',
          left: rect.left,
          top: rect.top,
          
          // Calculate translation to make it appear like it's moving smoothly
          transform:  'translate(10px, 5px)',
          
          // Add smooth transition
          transition: 'transform 0.3s ease-in-out'
        });
      }
    } else {
      // Reset to original positioning when not scrolled
      setButtonPosition(prevState => ({
        ...prevState,
        transform: 'translate(0px, 0px)',
        transition: 'transform 0.3s ease-in-out'
      }));
    }
  }, [isScrolled]);


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
            className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-7 text-sm"
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
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 200);  // Transition time
  };

  return (
    <article>
      <div className="text-left sm:px-8">
        <div className="mt-[calc(theme(spacing.24)-theme(spacing.3))] pb-10"></div>
        {loading && (
          <div className="flex justify-center items-center pt-[25vh]">
            <div
              className="w-16 h-16 border-8 rounded-full animate-spin"
              style={{
                borderColor: "transparent",
                borderTopColor: "rgba(20, 184, 166, 0.7)",
                borderRightColor: "rgba(13, 148, 136, 0.9)",
                borderBottomColor: "rgba(19, 78, 74, 1)",
              }}
            ></div>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center font-bold text-red-500 pt-[15vh]">
            {error} — Article does not exist
          </div>
        )}
        {!error && !loading && (
          <>
            <header className="flex justify-between items-center relative">
              <div className="sm:flex sm:items-center">
                <time className="order-first flex items-center text-base text-zinc-500 sm:mt-0 sm:mr-4">
                  <span className="h-4 w-0.5 rounded-full bg-zinc-500"></span>
                  <span className="ml-3">{post?.date}</span>
                </time>
              </div>
              <div className="absolute right-0 -top-2 h-10 w-10">
                <button
                  onClick={handleClick}
                  type="button"
                  aria-label="Go back to articles"
                  ref={buttonRef}
                  style={buttonPosition}
                  className={`group flex h-10 w-10 items-center justify-center rounded-full shadow-md shadow-zinc-800/5 lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 border border-zinc-700/50 bg-zinc-800/90 ring-0 ring-white/10 hover:border-zinc-700 hover:ring-white/20`}
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
              </div>
            </header>
            <h1 className="mt-10 text-4xl font-inter font-bold tracking-tight sm:text-5xl text-zinc-100">
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
