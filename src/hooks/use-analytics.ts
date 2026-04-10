import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export function useAnalytics() {
  const location = useLocation();
  useEffect(() => {
    const analyticsId = import.meta.env.VITE_ANALYTICS_ID;
    // Stubbed analytics tracking
    const trackPageview = (url: string) => {
      if (import.meta.env.DEV) {
        console.log(`[Analytics Stub] Pageview tracked: ${url}`);
      }
      if (analyticsId) {
        // Insert provider specific tracking here (e.g., window.plausible('pageview'))
        // Example:
        // if (typeof window !== 'undefined' && window.plausible) {
        //   window.plausible('pageview', { u: url });
        // }
      }
    };
    trackPageview(location.pathname + location.search);
  }, [location]);
  const trackEvent = (eventName: string, props?: Record<string, any>) => {
    if (import.meta.env.DEV) {
      console.log(`[Analytics Stub] Event tracked: ${eventName}`, props);
    }
    if (import.meta.env.VITE_ANALYTICS_ID) {
      // Insert provider specific event tracking here
      // Example:
      // if (typeof window !== 'undefined' && window.plausible) {
      //   window.plausible(eventName, { props });
      // }
    }
  };
  return { trackEvent };
}