import React, { useState, KeyboardEvent } from "react";
import { css } from "../../../styled-system/css";

interface MessageSenderProps {
  onSendMessage: (content: string) => void;
}

const MessageSender: React.FC<MessageSenderProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        gap: "0.5rem",
        padding: "1rem",
        backgroundColor: "white",
        borderTop: "1px solid #e5e7eb",
        position: "sticky",
        bottom: 0,
      })}
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        className={css({
          flex: 1,
          resize: "none",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          padding: "0.75rem",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          minHeight: "2.5rem",
          maxHeight: "10rem",
          outline: "none",
          _focus: {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
          },
          _placeholder: {
            color: "#9ca3af",
          },
        })}
      />
      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem",
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          fontWeight: "500",
          transition: "all 0.2s",
          _hover: {
            backgroundColor: "#2563eb",
          },
          _disabled: {
            backgroundColor: "#93c5fd",
            cursor: "not-allowed",
          },
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={css({
            width: "1.25rem",
            height: "1.25rem",
          })}
        >
          <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageSender;
