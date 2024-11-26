import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BlogPost as BlogPostType } from '../types/index';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="text-left sm:px-8 ">
      <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))] pb-10"></div>
        <article className="prose mx-auto mt-8">
        <h1>{post?.title}</h1>
        <time className="text-sm text-gray-500">{post?.date}</time>
        </article>
    </div>
  );
};

export default BlogPost;
