import ChatList from "@/components/Chat/ChatList";
import ChatPanel, { ChatPanelProp } from "@/components/Chat/ChatPanel";
import { useState, useEffect } from "react";

export type SelectedInterlocutorData = {
  interlocutor_id: number;
  username: string;
};

const Chat = () => {
  const [selectedInterlocutorData, setSelectedInterlocutorData] =
    useState<SelectedInterlocutorData | null>(null);
  const [chatPanelData, setChatPanelData] = useState<ChatPanelProp>({
    name: "Please select a chat",
    chats: [],
  });

  useEffect(() => {
    if (selectedInterlocutorData !== null) {
      const fetchChatPanelData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4001/api/chat/conversation?interlocutor_id=${selectedInterlocutorData.interlocutor_id}`,
            {
              credentials: "include",
            },
          );
          const result = await response.json();
          if (result.success) {
            setChatPanelData({
              name: selectedInterlocutorData.username,
              chats: result.data,
            });
          }
        } catch (error) {
          console.error("Error fetching chat panel data:", error);
        }
      };

      fetchChatPanelData();
    }
  }, [selectedInterlocutorData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-light px-64 py-6">
      <div className="w-full rounded-lg bg-gray-lighter px-12 py-4 drop-shadow-lg">
        <h1 className="text-left text-3xl text-gray-dark">Messages</h1>
      </div>
      <div className="flex flex-grow flex-row gap-8">
        <ChatList onSelectChat={setSelectedInterlocutorData} />
        <ChatPanel {...chatPanelData} />
      </div>
    </main>
  );
};

export default Chat;
