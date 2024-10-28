import React, { useState, useEffect } from 'react';
import { usePageLoading } from '../hooks/usePageLoading';
import axios from 'axios';

const Blog: React.FC = () => {
  usePageLoading();
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<string[]>('http://localhost:8000/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <p className="mb-6 text-lg">I'm a passionate software developer with experience in React, TypeScript, and Python. I love creating efficient and user-friendly web applications.</p>
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      {skills.length > 0 ? (
        <ul className="grid grid-cols-2 gap-2">
          {skills.map((skill, index) => (
            <li key={index} className="bg-openai-hover p-2 rounded">{skill}</li>
          ))}
        </ul>
      ) : (
        <p>Loading skills...</p>
      )}
    </div>
  );
}

export default Blog;