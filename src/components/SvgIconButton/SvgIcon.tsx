import React, { ComponentType } from "react";
import {
  ArrowBack,
  ChevronLeft,
  ChevronRight,
  Close,
  Pokeball,
  Search,
  Straighten,
  Weight,
} from "./icons";

const icons = {
  ArrowBack,
  ChevronLeft,
  ChevronRight,
  Close,
  Pokeball,
  Search,
  Straighten,
  Weight,
};

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
  role?: string;
  [key: string]: any;
}

const SvgIcon: React.FunctionComponent<IconProps> = ({
  name,
  color = "currentColor",
  width = "24",
  height = "24",
  role = "img",
  ...props
}) => {
  const Component = icons[name] as ComponentType<
    JSX.IntrinsicElements["svg"] & { title: string }
  >;

  return (
    <Component
      width={width}
      height={height}
      fill={color}
      role={role}
      title={name}
      aria-label={name}
      name={name}
      color={color}
      {...props}
    />
  );
};

export default SvgIcon;
