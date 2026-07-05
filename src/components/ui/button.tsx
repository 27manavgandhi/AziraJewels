"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Built in the shadcn/ui pattern (cva-driven variants, fully owned source,
 * no visual defaults kept) but themed entirely to the brand from the
 * ground up — there is no "shadcn look" left to spot here.
 *
 * Press feedback is a plain scale(0.97) on tap — this is a high-frequency
 * element (people tap CTAs, then may tap again), so per the frequency
 * gate it gets instant, minimal feedback rather than an elaborate
 * animation. There is deliberately no idle pulse/glow loop on any
 * variant: a breathing CTA reads as dated rather than premium, and ages
 * badly for a page people may reopen from a saved contact.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-body font-medium tracking-wide transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        gold: "bg-gradient-to-b from-gold-soft to-gold text-ink shadow-gold-glow hover:shadow-none hover:brightness-105",
        dark: "bg-charcoal text-ivory border border-gold/25 hover:border-gold/55 hover:bg-charcoal-2",
        outline: "bg-transparent text-ivory border border-ivory/20 hover:border-gold/55 hover:text-gold",
        ghost: "bg-transparent text-ivory/75 hover:text-gold",
      },
      size: {
        lg: "h-14 px-8 text-[1.05rem] min-w-[3.5rem]",
        default: "h-12 px-6 text-sm min-w-[3rem]",
        sm: "h-10 px-4 text-sm",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps &
  Omit<HTMLMotionProps<"a">, "className" | "children" | "href"> & {
    href: string;
    external?: boolean;
  };

type ButtonAsButton = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { className, variant, size, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if (props.href) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className={classes}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  const { variant: _v2, size: _s2, className: _c2, children: _ch2, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className={classes}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export { buttonVariants };
