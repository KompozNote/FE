import React from "react";
import { css } from "@/../../styled-system/css";
import ProfileImg from "./ProfileImg";
import Button from "./Buttons/Button";
import { useRouter } from "next/navigation";

const ProfileHeader: React.FC = () => {
  const router = useRouter();
  return (
    <div
      className={css({
        position: "sticky",
        top: 0,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        zIndex: 100,
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
          onClick={() => router.back()}
          className={css({
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
          })}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
