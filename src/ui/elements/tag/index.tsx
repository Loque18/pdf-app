import { forwardRef, type HTMLAttributes } from "react";

const baseStyle =
  "inline-flex items-center rounded-full font-medium transition-colors";

const colorVariants = {
  blue: "bg-blue-100 text-blue-700",
  neutral: "bg-zinc-100 text-zinc-700",
  green: "bg-emerald-100 text-emerald-700",
} as const;

const sizeVariants = {
  "24": "h-6 px-2 text-xs",
  "32": "h-8 px-3 text-sm",
} as const;

export type TagVariant = {
  color?: keyof typeof colorVariants;
  size?: keyof typeof sizeVariants;
};

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: TagVariant;
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { className, variant, ...props },
  ref,
) {
  const color = variant?.color ?? "blue";
  const size = variant?.size ?? "24";
  const classes = [
    baseStyle,
    colorVariants[color],
    sizeVariants[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      ref={ref}
      className={classes}
      {...props}
    />
  );
});

Tag.displayName = "Tag";
