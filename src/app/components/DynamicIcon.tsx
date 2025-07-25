import * as bs from "react-icons/bs";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon = ({ name, className = "" }: DynamicIconProps) => {
  const IconComponent = (bs as any)[name];
  return IconComponent ? (
    <IconComponent className={className} aria-hidden="true" focusable="false" />
  ) : null;
};
