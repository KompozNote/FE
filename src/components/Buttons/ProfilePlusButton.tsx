import React from "react";
import Button from "./Button";
import { TfiPlus } from "react-icons/tfi";

const ProfilePlusButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <Button variant="plus" size="md" icon={<TfiPlus />} {...props}>
      Add Profile
    </Button>
  );
};

export default ProfilePlusButton;
