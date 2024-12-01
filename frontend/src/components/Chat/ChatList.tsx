import { useEffect, useState } from "react";
import ChatContext, { ChatContextProp } from "./ChatContact";

function ChatList() {
  const [chatList, setChatList] = useState<ChatContextProp[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await fetch(
          "http://localhost:4001/api/chat/chat-interlocutors-history",
          {
            credentials: "include",
          },
        );
        const result = await response.json();
        if (result.success) {
          setChatList(result.data);
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, []);

  return (
    <div className="max-w-sm divide-y-2 divide-gray-dark rounded-lg bg-gray-lighter drop-shadow-xl">
      {chatList.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-4 text-center text-3xl">
          <span className="text-3xl text-gray-600">No chat history</span>
          <span className="text-lg text-gray-400">
            Start a new chat to start chatting
          </span>
        </div>
      ) : (
        chatList.map((chatContextData) => (
          <ChatContext
            key={chatContextData.interlocutor_id}
            contact={chatContextData}
          />
        ))
      )}
    </div>
  );
}

export default ChatList;
