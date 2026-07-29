import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useFloatEffect } from "@/app/hooks/useFloatEffect";
import { SanityImage } from "@/app/utils/types";
import AvatarCanvas, { AvatarCanvasHandle } from "../animations/AvatarCanvas";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const Avatar = ({ asset }: { asset: SanityImage }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  // const [hasLanded, setHasLanded] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const impactRef = useRef<AvatarCanvasHandle>(null);
  const avatarRef = useFloatEffect({
    amplitude: 10,
    speed: 0.01,
    delay: 950,
  });

  const avatarClass = [
    "avatar",
    prefersReducedMotion ? "avatar-thunk-reduced" : "avatar-thunk",
  ]
    .filter(Boolean)
    .join(" ");

  const handleThunkComplete = () => {
    // setHasLanded(true);

    if (!prefersReducedMotion) {
      setShowShockwave(true);
      impactRef.current?.play();
    }
  };

  const handleShockwaveComplete = () => {
    setShowShockwave(false);
  };

  return (
    <div className="profile-image">
      <div className="avatar-float" ref={avatarRef}>
        <div className="avatar-wrapper">
          <AvatarCanvas ref={impactRef} />
          <div
            className={`avatar-shockwave ${showShockwave ? "active" : ""}`}
            onAnimationEnd={handleShockwaveComplete}
          />

          <div className={avatarClass} onAnimationEnd={handleThunkComplete}>
            <Image
              src={urlFor(asset).url()}
              alt="Glitched mouse cursor with orange and blue highlights"
              width={150}
              height={150}
              className="avatar-img"
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
