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

    // 스크롤을 맨 아래로 이동
    setTimeout(() => {
      const chatListElement = document.getElementById("chat-list");
      if (chatListElement) {
        chatListElement.scrollTop = chatListElement.scrollHeight;
      }
    }, 0);
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
      })}
    >
      {/* 채팅 리스트 */}
      <div
        id="chat-list"
        className={css({
          flex: 1,
          overflowY: "auto", // 스크롤 가능
          padding: "1rem",
        })}
      >
        <ChatList messages={messages} />
      </div>

      {/* 메시지 입력 */}
      <div
        className={css({
          position: "sticky",
          bottom: 0, // 화면 하단에 고정
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
        })}
      >
        <MessageSender onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatWidget;
