import React from 'react';

const Contact: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
      <p className="mb-6 text-lg">Feel free to reach out to me for any inquiries or opportunities.</p>
      <div className="bg-openai-hover p-6 rounded-lg">
        <ul className="space-y-4">
          <li><strong>Email:</strong> your.email@example.com</li>
          <li><strong>LinkedIn:</strong> linkedin.com/in/yourprofile</li>
          <li><strong>GitHub:</strong> github.com/yourusername</li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;