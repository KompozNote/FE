import React from "react";
import Button from "./Button";
import { FaHandsHelping } from "react-icons/fa";

const HelpAndJoinIn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Button variant="join" size="md" icon={<FaHandsHelping />} {...props}>
      Help & Join In
    </Button>
  );
};

export default HelpAndJoinIn;
