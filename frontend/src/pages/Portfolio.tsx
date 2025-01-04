import { useState, useEffect } from 'react';
import axios from 'axios';
import { Project } from '../types';

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('http://localhost:8000/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center">Loading projects...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">My Projects</h1>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-openai-hover p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="mb-4">{project.description}</p>
              <button className="bg-openai-dark text-white px-4 py-2 rounded hover:bg-opacity-80 transition duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No projects found.</p>
      )}
    </div>
  );
}

export default Portfolio;