import React from "react";
import { css } from "../../../styled-system/css";

interface ChatBubbleProps {
  message: string;
  isOwner?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isOwner = false,
}) => {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: isOwner ? "flex-end" : "flex-start",
      })}
    >
      <div
        className={css({
          maxWidth: "70%",
          borderRadius: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: isOwner ? "#3b82f6" : "#e5e7eb",
          color: isOwner ? "white" : "#1f2937",
          borderBottomRightRadius: isOwner ? "0" : "1rem",
          borderBottomLeftRadius: isOwner ? "1rem" : "0",
        })}
      >
        <p
          className={css({
            fontSize: "0.875rem",
            margin: "0",
          })}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
