"use client";

import { styled } from "../../../styled-system/jsx";

const Button = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  variants: {
    size: {
      sm: {
        padding: "0.25rem 0.5rem",
        fontSize: "0.875rem",
      },
      md: {
        padding: "0.5rem 1rem",
        fontSize: "1rem",
      },
      lg: {
        padding: "0.5rem 10.5rem",
        fontSize: "1.125rem",
      },
    },
    variant: {
      primary: {
        backgroundColor: "#3b82f6",
        color: "white",
        _hover: {
          backgroundColor: "#2563eb",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "#374151",
        _hover: {
          backgroundColor: "#f3f4f6",
        },
      },
      // 상태변화 유지가 필요없는 아이콘
      icon: {
        padding: "0.5rem",
        borderRadius: "500px",
      },
      join: {
        backgroundColor: "#10b981",
        color: "white",
        _hover: {
          backgroundColor: "#059669",
        },
      },
      plus: {
        backgroundColor: "#171717",
        color: "white",
        _hover: {
          backgroundColor: "#262626",
        },
      },
      back: {
        backgroundColor: "#ef4444",
        color: "white",
        _hover: {
          backgroundColor: "#dc2626",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export default Button;
