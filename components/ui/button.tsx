import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-ink hover:bg-gold-bright shadow-[0_0_0_1px_rgba(201,169,110,0.4),0_8px_30px_-12px_rgba(201,169,110,0.5)]",
        secondary:
          "border border-line-strong bg-white/[0.03] text-parchment hover:bg-white/[0.07] hover:border-gold/40",
        ghost: "text-muted hover:text-parchment hover:bg-white/[0.05]",
        outline:
          "border border-gold/45 text-gold hover:bg-gold/10 hover:border-gold/70",
        danger:
          "border border-[#A03041]/50 text-[#E08D99] hover:bg-[#A03041]/15",
      },
      size: {
        sm: "h-8 px-3.5 text-xs [&_svg]:size-3.5",
        md: "h-10 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-7 text-[0.9375rem] [&_svg]:size-4",
        icon: "size-10 [&_svg]:size-4",
        "icon-sm": "size-8 [&_svg]:size-3.5",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
