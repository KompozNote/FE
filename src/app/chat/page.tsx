"use client";

import { css } from "../../../styled-system/css";
import ChatWidget from "@/components/Chat/ChatWidget";
import ProfileHeader from "@/components/ProfileHeader";

export default function ChatPage() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      })}
    >
      <ChatWidget />
    </div>
  );
}
