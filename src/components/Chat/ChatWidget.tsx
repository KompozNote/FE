import React, { useState } from "react";
import { css } from "../../../styled-system/css";
import ChatList, { Message } from "./ChatList";
import MessageSender from "./MessageSender";

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Test Message 1",
    isOwner: false,
    timestamp: "2024-04-10T10:00:00Z",
  },
  {
    id: "2",
    content: "Test Message 2",
    isOwner: true,
    timestamp: "2024-04-10T10:03:00Z",
  },
  {
    id: "3",
    content: "Test Message 3",
    isOwner: false,
    timestamp: "2024-04-11T10:00:00Z",
  },
];

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isOwner: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: "800px",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
      })}
    >
      <div
        className={css({
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
        })}
      >
        <ChatList messages={messages} />
      </div>
      <MessageSender onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWidget;
