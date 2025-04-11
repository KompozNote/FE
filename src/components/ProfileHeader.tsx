import React from "react";
import style from "./ProfileHeader.module.css";
import ProfileImg from "./ProfileImg";
import Button from "./Buttons/Button";
import { LuX } from "react-icons/lu";

const ProfileHeader: React.FC = () => {
  return (
    <header className={style.profile_header}>
      <div className={style.profile_header_content}>
        <ProfileImg src="" alt="User Profile" />
        <h1 className={style.profile_title}>Profile</h1>
        <Button className={style.close_button} icon={<LuX />} />
      </div>
    </header>
  );
};

export default ProfileHeader;
