import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useFloatEffect, usePrefersReducedMotion } from "@/app/hooks";
import { SanityImage } from "@/app/utils/types";
import AvatarCanvas, { AvatarCanvasHandle } from "../animations/AvatarCanvas";

const Avatar = ({ asset }: { asset: SanityImage }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showShockwave, setShowShockwave] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  const impactRef = useRef<AvatarCanvasHandle>(null);
  const avatarRef = useFloatEffect({
    amplitude: 10,
    speed: 0.01,
    delay: 950,
  });

  const avatarClass = [
    "avatar",
    !isIdle && (prefersReducedMotion ? "avatar-thunk-reduced" : "avatar-thunk"),
  ]
    .filter(Boolean)
    .join(" ");

  const handleThunkComplete = () => {
    if (!prefersReducedMotion) {
      setShowShockwave(true);
      impactRef.current?.play();

      // Wait until the impact has finished.
      setTimeout(() => setIsIdle(true), 350);
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

          <div
            className={[avatarClass, isIdle && "avatar-idle"]
              .filter(Boolean)
              .join(" ")}
            onAnimationEnd={handleThunkComplete}
          >
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
