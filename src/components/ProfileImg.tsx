import React from "react";
import { css } from "@/../../styled-system/css";

interface ProfileImgProps {
  src: string;
  alt?: string;
}

const ProfileImg: React.FC<ProfileImgProps> = ({
  src,
  alt = "User Profile",
}) => {
  return (
    <div
      className={css({
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      {src ? (
        <img
          className={css({
            width: "100%",
            height: "100%",
            objectFit: "cover",
          })}
          src={src}
          alt={alt}
        />
      ) : (
        <div
          className={css({
            width: "100%",
            height: "100%",
            backgroundColor: "#ccc",
          })}
        />
      )}
    </div>
  );
};

export default ProfileImg;
