import React from "react";
import { css } from "@/../../styled-system/css";
import ProfileImg from "./ProfileImg";
import Button from "./Buttons/Button";
import { LuX } from "react-icons/lu";

const ProfileHeader: React.FC = () => {
  return (
    <header
      className={css({
        backgroundColor: "white",
        zIndex: 1000,
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        })}
      >
        <ProfileImg src="" alt="User Profile" />
        <h1
          className={css({
            fontSize: "18px",
            fontWeight: "bold",
          })}
        >
          Profile
        </h1>
        <Button
          className={css({
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
          })}
        />
      </div>
    </header>
  );
};

export default ProfileHeader;
