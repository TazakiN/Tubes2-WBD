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
    interlocutor_id: "",
  });

  useEffect(() => {
    if (selectedInterlocutorData !== null) {
      const fetchChatPanelData = async () => {
        try {
          const response = await fetch(
            import.meta.env.VITE_API_BASE_URL +
              "/chat/conversation?" +
              new URLSearchParams({
                interlocutor_id:
                  selectedInterlocutorData.interlocutor_id.toString(),
              }),
            {
              credentials: "include",
            },
          );
          const result = await response.json();
          if (result.success) {
            setChatPanelData({
              name: selectedInterlocutorData.username,
              chats: result.data,
              interlocutor_id:
                selectedInterlocutorData.interlocutor_id.toString(),
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
