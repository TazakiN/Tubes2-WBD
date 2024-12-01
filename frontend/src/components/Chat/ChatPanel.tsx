import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";

export type Chat = {
  id: string;
  from_id: string;
  to_id: string;
  message: string;
  timestamp: Date;
};

export type ChatPanelProp = {
  interlocutor_id: string;
  name: string;
  chats: Chat[];
};

function ChatPanel(chatPanelProps: ChatPanelProp) {
  const navigate = useNavigate({ from: "/chat" });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Chat[]>(chatPanelProps.chats);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:4001/ws");

    webSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    webSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, [chatPanelProps.interlocutor_id]);

  function handleMessageSubmit(message: string): void {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          to_id: chatPanelProps.interlocutor_id,
          message,
        }),
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          from_id: "You",
          to_id: chatPanelProps.interlocutor_id,
          message,
          timestamp: new Date(),
        },
      ]);
    }
  }

  useEffect(() => {
    setMessages(chatPanelProps.chats);
  }, [chatPanelProps.chats]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-[600px] w-[600px] flex-col rounded-lg bg-gray-lighter">
      <div className="rounded-t-xl bg-blue-secondary px-10 py-5">
        <h3
          className="cursor-pointer truncate text-2xl text-gray-lighter transition-all duration-300 ease-in-out hover:text-3xl"
          onClick={() => navigate({ to: "/" })}
        >
          {chatPanelProps.name}
        </h3>
      </div>
      <div className="flex-grow overflow-y-auto bg-gray-lighter">
        <div className="flex flex-col gap-4 p-4">
          {messages.map((chat) => (
            <ChatBubble
              {...chat}
              key={chat.id}
              username={
                chat.from_id === chatPanelProps.interlocutor_id
                  ? chatPanelProps.name
                  : "You"
              }
              from_user={chat.to_id === chatPanelProps.interlocutor_id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSubmit={handleMessageSubmit} />
    </div>
  );
}

export default ChatPanel;
