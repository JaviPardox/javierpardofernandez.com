import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

// `key` resets the thresholds, so each route is measured separately.
const useScrollDepth = (key: string): void => {
  useEffect(() => {
    const reached = new Set<number>();

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = (window.scrollY / scrollable) * 100;
      THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          trackEvent("scroll_depth", { percent: threshold, page_path: key });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);
};

export default useScrollDepth;
