import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About: React.FC = () => {
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
      <h1>About Me</h1>
      <p>I'm a passionate software developer with experience in React, TypeScript, and Python. I love creating efficient and user-friendly web applications.</p>
      <h2>Skills</h2>
      {skills.length > 0 ? (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p>Loading skills...</p>
      )}
    </div>
  );
}

export default About;