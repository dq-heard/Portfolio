import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useFloatEffect } from "@/app/hooks/useFloatEffect";
import { SanityImage } from "@/app/utils/types";

const Avatar = ({ asset }: { asset: SanityImage }) => {
  const avatarRef = useFloatEffect() as React.RefObject<HTMLDivElement>;

  return (
    <div className="profile-image">
      <div className="avatar" ref={avatarRef}>
        <Image
          src={urlFor(asset).url()}
          alt="Pixel image headshot of D. Heard, Front End Developer"
          width={150}
          height={150}
          className="avatar-img"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Avatar;
