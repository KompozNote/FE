import React from "react";
import { css } from "../../../styled-system/css";
import ChatBubble from "./ChatBubble";

export interface Message {
  id: string;
  content: string;
  isOwner: boolean;
  timestamp: string;
}

interface ChatListProps {
  messages: Message[];
}

const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const groupMessagesByDate = (messages: Message[]) => {
  const groups: { [key: string]: Message[] } = {};

  messages.forEach((message) => {
    const date = new Date(message.timestamp);
    const dateKey = date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });

  return Object.entries(groups).map(([dateKey, messages]) => ({
    date: new Date(dateKey),
    messages,
  }));
};

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem 1rem",
        gap: "0.5rem",
        height: "100%",
        overflowY: "auto",
      })}
    >
      {groupedMessages.map(({ date, messages }) => (
        <div key={date.toISOString()}>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0.75rem 0",
              position: "relative",
              _before: {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "#e5e7eb",
                zIndex: 1,
              },
            })}
          >
            <span
              className={css({
                backgroundColor: "white",
                padding: "0 1rem",
                color: "#6b7280",
                fontSize: "0.875rem",
                position: "relative",
                zIndex: 2,
              })}
            >
              {formatDate(date)}
            </span>
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            })}
          >
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.content}
                isOwner={message.isOwner}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
