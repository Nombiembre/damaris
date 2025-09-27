import type { ElementType, ComponentPropsWithoutRef } from "react";

const variantClasses = {
  h1: "text-4xl md:text-7xl font-bold text-center",
  h2: "text-3xl md:text-5xl font-bold capitalize",
  h3: "text-xl md:text-3xl font-bold text-center capitalize",
  h4: "text-lg md:text-2xl font-semibold text-center capitalize",
  subtitle: "md:text-lg text-md font-semibold uppercase text-center",
  p: "text-lg md:text-xl",
} as const;

const colorClasses = {
  white: "text-white",
  black: "text-gray-900",
  primary: "text-accent",
  blue: "text-blue-500",
  neutral: "text-neutral-300",
} as const;

interface TypographyProps<T extends ElementType> {
  as?: T;
  variant: keyof typeof variantClasses;
  color?: keyof typeof colorClasses;
  className?: string;
}

const Typography = <T extends ElementType = "p">({
  as,
  variant,
  color,
  className = "",
  ...props
}: TypographyProps<T> & ComponentPropsWithoutRef<T>) => {
  const Component = as || "p";
  const classes = [
    variantClasses[variant],
    color ? colorClasses[color] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes} {...props} />;
};

export default Typography;
