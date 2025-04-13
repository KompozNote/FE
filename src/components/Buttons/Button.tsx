"use client";

import { css } from "@/../../styled-system/css";
import { cva } from "@/../../styled-system/css";
import React from "react";

type ButtonProps = {
  variant?: "primary" | "ghost" | "icon" | "join" | "plus" | "back";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClickFunc?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// ✨ Panda용 스타일 정의 (cva = class variance authority)
const buttonStyle = cva({
  base: {
    rounded: "xl",
    fontWeight: "medium",
    transition: "all",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
  },
  variants: {
    size: {
      sm: { px: "2", py: "1", fontSize: "sm" },
      md: { px: "4", py: "2", fontSize: "base" },
      lg: { px: "6", py: "3", fontSize: "lg" },
    },
    variant: {
      primary: {
        p: "15px 170px",
        bg: "gray.200",
        color: "black",
        _hover: { bg: "gray.400" },
      },
      ghost: {
        bg: "transparent",
        color: "gray.700",
        _hover: { bg: "gray.100" },
      },
      icon: {
        p: "2",
        bg: "gray.200",
        borderRadius: "full",
        _hover: { bg: "gray.300" },
      },
      join: {
        bg: "green.600",
        color: "white",
        _hover: { bg: "green.700" },
      },
      plus: {
        bg: "neutral.800",
        color: "white",
        _hover: { bg: "neutral.700" },
      },
      back: {
        bg: "red.600",
        color: "white",
        _hover: { bg: "red.700" },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  onClickFunc,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClickFunc || (() => {})}
      className={buttonStyle({ variant, size })}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
