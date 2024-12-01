import ChatList from "@/components/Chat/ChatList";
import ChatPanel, { ChatPanelProp } from "@/components/Chat/ChatPanel";
import { useState } from "react";

const Chat = () => {
  const [chatPanelData, setChatPanelData] = useState<ChatPanelProp>({
    name: "",
    chats: [],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-light px-64 py-6">
      <div className="w-full rounded-lg bg-gray-lighter px-12 py-4 drop-shadow-lg">
        <h1 className="text-left text-3xl text-gray-dark">Messages</h1>
      </div>
      <div className="flex flex-grow flex-row gap-8">
        <ChatList />
        <ChatPanel name={chatPanelData.name} chats={chatPanelData.chats} />
      </div>
    </main>
  );
};

export default Chat;
