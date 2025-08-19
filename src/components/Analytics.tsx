import React, { useEffect } from 'react';
import { posthog } from '../utils/posthog';

interface AnalyticsProps {
  page?: string;
  properties?: Record<string, any>;
}

const Analytics: React.FC<AnalyticsProps> = ({ page, properties = {} }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && page) {
      // Track page view with custom properties
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        page,
        ...properties,
      });
    }
  }, [page, properties]);

  return null; // This component doesn't render anything
};

// Helper functions for tracking events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties);
  }
};

export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
};

export default Analytics;