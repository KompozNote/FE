// components/ui/Text.tsx
"use client";

import { css, cx } from "@/../../styled-system/css";
import { ReactNode } from "react";
import { ElementType } from "react";

type TextProps = {
  as?: ElementType; // "h1", "p", "span", etc
  children: ReactNode;
  className?: string;
};

export default function Text({ as = "p", children, className }: TextProps) {
  const Component = as;

  return (
    <Component
      className={cx(
        css({
          fontSize: "18px",
          fontWeight: "bold",
          width: "100%",
        }),
        className
      )}
    >
      {children}
    </Component>
  );
}
