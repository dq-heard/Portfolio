import {
  useEffect,
  useRef,
  useState,
  ElementType,
  ComponentPropsWithRef,
} from "react";
import { usePrefersReducedMotion } from "@/app/hooks";

type TiltedCardProps<T extends ElementType> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
  reveal?: "normal" | "quiet";
} & ComponentPropsWithRef<T>;

export const TiltedCard = <T extends ElementType = "section">({
  children,
  className = "",
  as,
  ...props
}: TiltedCardProps<T>) => {
  const Tag = as || "section";
  const revealRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [motionChecked, setMotionChecked] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const node = revealRef.current;
    if (!node) return;
    if (revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setRevealed(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [revealed, prefersReducedMotion]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (prefersReducedMotion) return;

    // 🦊 FIREFOX ESCAPE HATCH: Skip tilt logic entirely if the browser is Firefox
    const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
    if (isFirefox) return;

    const handleTilt = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 1.2;
      const rotateX = -((y - centerY) / centerY) * 1.2;

      card.classList.add("tilted");
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      card.style.zIndex = "10";

      const { angle, intensity } = calculateShine(
        x,
        y,
        rect.width,
        rect.height
      );
      card.style.setProperty("--shine-angle", `${angle}deg`);
      card.style.setProperty("--shine-opacity", `${intensity * 0.7}`);
    };

    const handleLeave = () => {
      card.classList.remove("tilted");
      card.style.transition = "all 0.5s ease";
      card.style.transform = "";
      card.style.removeProperty("--shine-angle");
      card.style.removeProperty("--shine-opacity");
      card.style.zIndex = "";
      setTimeout(() => {
        card.style.transition = "";
      }, 500);
    };

    card.addEventListener("mousemove", handleTilt, { passive: true });
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleTilt);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={revealRef}
      className={["reveal-shell", revealed && "revealed"]
        .filter(Boolean)
        .join(" ")}
    >
      <Tag ref={cardRef} className={`glass-card ${className}`} {...props}>
        {children}
      </Tag>
    </div>
  );

  function calculateShine(
    x: number,
    y: number,
    width: number,
    height: number
  ): { angle: number; intensity: number } {
    const angleX = (x / width) * 2 - 1;
    const angleY = (y / height) * 2 - 1;
    const angle = Math.atan2(angleY, angleX) * (180 / Math.PI) + 90;

    const distanceX = Math.abs(x - width / 2) / (width / 2);
    const distanceY = Math.abs(y - height / 2) / (height / 2);
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const intensity = 0.15 - distance * 0.08;

    return {
      angle,
      intensity: Math.max(0.03, intensity),
    };
  }
};

export default TiltedCard;
