import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
          <h2 key={index} className="text-2xl font-semibold mb-4">
            {block.content}
          </h2>
        );
      case "text":
        return (
          <p key={index} className="mb-4 text-lg">
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
            className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4"
          >
            <code>{block.content}</code>
          </pre>
        );
      case "dotted_list":
        return (
          <ul key={index} className="list-disc pl-5 mb-4">
            {(block.content as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case "numbered_list":
        return (
          <ol key={index} className="list-decimal pl-5 mb-4">
            {(block.content as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      default:
        return null; // Fallback for unknown types
    }
  };

  return (
    <article>
      <div className="text-left sm:px-8 ">
        <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))] pb-10"></div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!error && !loading && (
          <>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-inter font-bold tracking-tight sm:text-5xl text-zinc-100">
                {post?.title}
              </h1>
              <time
                dateTime="2022-09-05"
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                <span className="ml-3">{post?.date}</span>
              </time>
            </header>
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
