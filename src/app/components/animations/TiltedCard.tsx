import { useEffect, useRef, ElementType, ComponentPropsWithRef } from "react";

type TiltedCardProps<T extends ElementType> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
} & ComponentPropsWithRef<T>;

export const TiltedCard = <T extends ElementType = "section">({
  children,
  className = "",
  as,
  ...props
}: TiltedCardProps<T>) => {
  const Tag = as || "section";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
      card.classList.add("shining");
      card.style.setProperty("--shine-angle", `${angle}deg`);
      card.style.setProperty("--shine-opacity", `${intensity * 0.7}`);
    };

    const handleLeave = () => {
      card.classList.remove("tilted", "shining");
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
  }, []);

  return (
    <Tag ref={ref} className={`glass-card ${className}`} {...props}>
      {children}
    </Tag>
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
