import React from "react";
import style from "./ProfileHeader.module.css";
import ProfileImg from "./ProfileImg";

const ProfileHeader: React.FC = () => {
  return (
    <header className={style.profile_header}>
      <div className={style.profile_header_content}>
        <ProfileImg src="" alt="User Profile" />
        <h1 className={style.profile_title}>Profile</h1>
        <button className={style.close_button}>×</button>
      </div>
    </header>
  );
};

export default ProfileHeader;
