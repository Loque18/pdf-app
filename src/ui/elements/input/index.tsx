import { forwardRef, type InputHTMLAttributes } from "react";

const baseStyle =
  "w-full rounded-md border bg-white px-3 text-sm text-zinc-950 shadow-xs outline-none transition-colors placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const colorVariants = {
  blue: "border-zinc-200 focus-visible:ring-blue-600",
  neutral: "border-zinc-200 focus-visible:ring-zinc-500",
  danger: "border-red-300 focus-visible:ring-red-600",
} as const;

const sizeVariants = {
  "40": "h-10",
  "48": "h-12",
} as const;

export type InputVariant = {
  color?: keyof typeof colorVariants;
  size?: keyof typeof sizeVariants;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant, ...props },
  ref,
) {
  const color = variant?.color ?? "blue";
  const size = variant?.size ?? "40";
  const classes = [
    baseStyle,
    colorVariants[color],
    sizeVariants[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      ref={ref}
      className={classes}
      {...props}
    />
  );
});

Input.displayName = "Input";
