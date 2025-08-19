import React, { useEffect } from 'react';
import { posthog } from '../utils/posthog';

interface PostHogProviderProps {
  children: React.ReactNode;
}

const PostHogProvider: React.FC<PostHogProviderProps> = ({ children }) => {
  useEffect(() => {
    // PostHog is already initialized in the utils file
    // This component can be used for any additional setup if needed
  }, []);

  return <>{children}</>;
};

export default PostHogProvider;