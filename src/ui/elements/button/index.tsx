import { forwardRef, type ButtonHTMLAttributes } from "react";

const baseStyle =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const colorVariants = {
  blue: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
  neutral:
    "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900",
  ghost:
    "bg-transparent text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-400",
} as const;

const sizeVariants = {
  "32": "h-8 px-3 text-sm",
  "40": "h-10 px-4 text-sm",
  "48": "h-12 px-5 text-base",
} as const;

export type ButtonVariant = {
  color?: keyof typeof colorVariants;
  size?: keyof typeof sizeVariants;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, type = "button", variant, ...props }, ref) {
    const color = variant?.color ?? "blue";
    const size = variant?.size ?? "40";

    return (
      <button
        ref={ref}
        type={type}
        className={[baseStyle, colorVariants[color], sizeVariants[size], className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
