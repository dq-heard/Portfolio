import { useEffect } from "react";

export function usePulseEffect(selector = ".timeline-dot") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add("animated");
        } else {
          el.classList.remove("animated");
        }
      });
    });

    const dots = document.querySelectorAll(selector);
    dots.forEach((dot) => observer.observe(dot));

    return () => observer.disconnect();
  }, [selector]);
}
