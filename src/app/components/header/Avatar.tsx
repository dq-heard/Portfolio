import { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useFloatEffect } from "@/app/hooks/useFloatEffect";
import { SanityImage } from "@/app/utils/types";
import AvatarCanvas, { AvatarCanvasHandle } from "../animations/AvatarCanvas";

const Avatar = ({ asset }: { asset: SanityImage }) => {
  const impactRef = useRef<AvatarCanvasHandle>(null);
  const avatarRef = useFloatEffect(
    10,
    0.01,
    950
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      impactRef.current?.play();
    }, 550);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="profile-image">
      <div className="avatar-float" ref={avatarRef}>
        <div className="avatar-wrapper">
          <AvatarCanvas ref={impactRef} />

          <div className="avatar avatar-enter">
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
