import { useState, useEffect } from "react";
import api from "../api/axios";
import { BlogPreview as BlogPreviewType } from "../types/index";
import BlogPreview from "../components/blog/BlogPreview";

const Blog = () => {
  const [previews, setPreviews] = useState<BlogPreviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const response = await api.get<BlogPreviewType[]>(`/blog/preview`);
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
    <div className="min-h-[84vh]">
      <div className="text-left sm:px-8 pb-8 flex flex-col">
        <div className="mt-[calc(theme(spacing.20)-theme(spacing.3))] pb-10"></div>
        <h1 className="max-w-2xl text-4xl sm:text-4.82xl mb-6 mt-7 text-zinc-100 font-inter font-bold tracking-tight leading-[2.5rem] sm:leading-[3.5rem]">
          Thoughts on life, software engineering, and the occasional rubber duck debugging session.
        </h1>
        <p className="max-w-2xl text-base text-zinc-400">
          A collection of insights, adventures, and lessons learned while trying to explain my code to inanimate objects. Stay tuned for the good stuff!
        </p>
        <div className="mt-16 sm:mt-20 flex-grow">
          {loading && (
            <div className="flex justify-center items-center sm:pt-[15vh] pt-[5vh]">
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
          {error && <div className="flex justify-center items-center font-extrabold text-red-500">{error}</div>}
          <div className="md:border-l md:pl-6 md:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">
              {!loading &&
                !error &&
                previews.map((preview) => (
                  <BlogPreview key={preview.id} preview={preview} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
