const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const DEBUG = process.env.REACT_APP_GA_DEBUG === "true";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let started = false;

const canTrack = (): boolean => {
  if (typeof window === "undefined" || !MEASUREMENT_ID) return false;
  return process.env.NODE_ENV !== "development" || DEBUG;
};

export const initAnalytics = (): void => {
  if (started) return;

  if (!MEASUREMENT_ID) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "REACT_APP_GA_MEASUREMENT_ID is unset; analytics disabled. It must be supplied as a Docker build arg."
      );
    }
    return;
  }

  if (!canTrack()) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  // gtag only accepts an Arguments object, not a rest array.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Page views are sent per route by trackPageView.
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
};

export const trackPageView = (path: string): void => {
  if (!canTrack() || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

export const trackEvent = (
  name: string,
  params?: Record<string, string | number | boolean>
): void => {
  if (!canTrack() || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
};
