import React from "react";
import style from "./ProfileImg.module.css";
import Image from "next/image";

interface ProfileImgProps {
  src: string;
  alt?: string;
}

const ProfileImg: React.FC<ProfileImgProps> = ({
  src,
  alt = "User Profile",
}) => {
  return (
    <div className={style.profile_img_wrapper}>
      <Image className={style.profile_img} src={src} alt={alt} />
    </div>
  );
};

export default ProfileImg;
