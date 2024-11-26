import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlogPreview as BlogPreviewType } from "../types/index";
import BlogPreview from "../components/BlogPreview";

const Blog: React.FC = () => {
  const [previews, setPreviews] = useState<BlogPreviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviews = async () => {
      const backendPort = process.env.REACT_APP_BACKEND_PORT;
      const serverIP = process.env.REACT_APP_SERVER_IP;
      try {
        const response = await axios.get<BlogPreviewType[]>(
          `http://${serverIP}:${backendPort}/blog/preview`
        );
        setPreviews(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviews();
  }, []);

  return (
    <div className="text-left sm:px-8 ">
      <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))] pb-10"></div>
      <h1 className="text-4xl sm:text-4.82xl mb-6 mt-7 text-zinc-100 font-inter font-bold tracking-tight leading-[2.5rem] sm:leading-[3.5rem]">
        Writing on software design, company building, and the aerospace
        industry.
      </h1>
      <p className="mt-6 text-base text-zinc-400">
        All of my long-form thoughts on programming, leadership, product design,
        and more, collected in chronological order.
      </p>
      <div className="mt-16 sm:mt-20">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div className="md:border-l md:pl-6 md:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
          {!loading && !error && previews.map((preview) => (
            <BlogPreview key={preview.id} preview={preview} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
