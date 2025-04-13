import React, { useState, useRef, useEffect } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isOwner: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // ✅ 메시지 변경 시 스크롤 맨 아래로 이동
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%", // 필요에 따라 '600px' 등으로 변경 가능
        backgroundColor: "white",
        overflow: "hidden",
      })}
    >
      <div
        className={css({
          flex: 1,
          overflowY: "auto",
          padding: "0 1.5rem",
          paddingBottom: "4rem", // ✅ 입력창과 간격
        })}
      >
        <ChatList messages={messages} />
        <div ref={scrollRef} /> {/* ✅ 자동 스크롤 포인트 */}
      </div>

      <MessageSender onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWidget;
