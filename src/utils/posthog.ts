import posthog from 'posthog-js';

// Initialize PostHog only on the client side
if (typeof window !== 'undefined') {
  if (import.meta.env.NODE_ENV === 'production') {
    // In development or testing, return children without initializing PostHog
  posthog.init(import.meta.env.PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.PUBLIC_POSTHOG_HOST,
    // Enable debug mode in development
    loaded: (posthog) => {
      if (import.meta.env.DEV) posthog.debug();
    },
    // Capture pageviews automatically
    capture_pageview: true,
    // Capture performance metrics
    capture_performance: true,
    // Enable session recording (optional)
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
        password: true,
      },
    },
  });
  }
}

export { posthog };