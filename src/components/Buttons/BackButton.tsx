import React from "react";
import Button from "./Button";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";

const BackButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      variant="ghost"
      size="md"
      icon={<IoArrowBack />}
      {...props}
    >
      Back
    </Button>
  );
};

export default BackButton;
