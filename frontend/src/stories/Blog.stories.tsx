import React from 'react';
import Blog from '../pages/Blog';
import { Meta, StoryFn } from '@storybook/react';
import { BlogPreview as BlogPreviewType } from '../types/index';

export default {
  title: 'Blog/BlogComponent',
  component: Blog,
} as Meta;

const Template: StoryFn<{ previews: BlogPreviewType[], loading: boolean, error: string | null }> = ({ previews, loading, error }) => {
    // Mock the component with different props
    return (
      <div>
        <BlogComponentMock previews={previews} loading={loading} error={error} />
      </div>
    );
  };

const BlogComponentMock: React.FC<{ previews: BlogPreviewType[], loading: boolean, error: string | null }> = ({ previews, loading, error }) => {
    // Simulate the Blog component's states
    return (
        <div>
        {loading && (
            <div className="flex justify-center items-center h-full">
            <div
              className="w-16 h-16 border-8 rounded-full animate-spin"
              style={{
                borderColor: "transparent",
                borderTopColor: "rgba(20, 184, 166, 0.7)", // Light teal
                borderRightColor: "rgba(13, 148, 136, 0.9)", // Medium teal
                borderBottomColor: "rgba(19, 78, 74, 1)", // Darker teal
              }}
            ></div>
          </div>
        )}
        {error && <div className="font-extrabold flex justify-center items-center text-red-500">{error}</div>}
        {!loading && !error && previews.map((preview) => (
            <div key={preview.id}>{preview.title}</div> // Replace with BlogPreview if needed
        ))}
        </div>
    );
};

// Story for the loading state
export const LoadingState = Template.bind({});
LoadingState.args = {
  previews: [],
  loading: true,
  error: null,
};

// Story for the error state
export const ErrorState = Template.bind({});
ErrorState.args = {
  previews: [],
  loading: false,
  error: 'Failed to load blog previews.',
};

// Story for the loaded state with mock data
export const LoadedState = Template.bind({});
LoadedState.args = {
  previews: [
    { id: "1", date:"01-01-2001", title: 'First Blog Post', preview_text: 'This is a summary of the first blog post.' },
    { id: "2", date:"01-01-2001", title: 'Second Blog Post', preview_text: 'This is a summary of the second blog post.' },
  ],
  loading: false,
  error: null,
};