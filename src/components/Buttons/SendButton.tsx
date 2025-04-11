import React from "react";
import Button from "./Button";
import { IoSend } from "react-icons/io5";

const SendButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Button variant="primary" size="md" icon={<IoSend />} {...props}>
      Send
    </Button>
  );
};

export default SendButton;
