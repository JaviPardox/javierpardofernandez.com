import BezierEasing from "bezier-easing";

export function smoothScrollTo(
  targetY: number,
  duration: number = 1000,
  easing: (t: number) => number = BezierEasing(0.42, 0, 0.58, 1)
) {
  // Get the current scroll position
  const startY = window.scrollY;
  const distance = targetY - startY;

  // Ensure we're not already at the target position
  if (Math.abs(distance) < 1) return;

  let startTime: number | null = null;

  function animation(currentTime: number) {
    // First time through, set the start time
    if (startTime === null) startTime = currentTime;

    // Calculate elapsed time
    const timeElapsed = currentTime - startTime;

    // Calculate progress (0 to 1)
    const progress = Math.min(timeElapsed / duration, 1);

    // Apply easing function to progress
    const easedProgress = easing(progress);

    // Calculate current scroll position
    const currentY = startY + distance * easedProgress;

    // Scroll to the calculated position
    window.scrollTo(0, currentY);

    // Continue animation if not complete
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  // Start the animation
  requestAnimationFrame(animation);
}
