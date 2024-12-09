import ChatList from "@/components/Chat/ChatList";
import ChatPanel, { ChatPanelProp } from "@/components/Chat/ChatPanel";
import { ChatContactProp } from "@/components/Chat/ChatContact";
import { useQuery } from "@tanstack/react-query";
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
  const [chatList, setChatList] = useState<ChatContactProp[]>([]);

  const { data } = useQuery({
    queryKey: ["chatList"],
    queryFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/chat/chat-interlocutors-history",
        {
          credentials: "include",
        },
      );
      const result = await response.json();
      return result.data;
    },
  });

  useEffect(() => {
    if (data) {
      setChatList(data);
    }
  }, [data]);

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

  const handleAddChat = (newChat: ChatContactProp) => {
    setChatList((prevChatList) => [...prevChatList, newChat]);
    setSelectedInterlocutorData({
      interlocutor_id: newChat.interlocutor_id,
      username: newChat.username,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-light px-4 py-6 md:px-16">
      <div className="w-full rounded-lg bg-gray-lighter px-4 py-4 drop-shadow-lg md:px-12">
        <h1 className="text-left text-3xl text-gray-dark">Messages</h1>
      </div>
      <div className="flex flex-grow flex-col gap-8 md:flex-row">
        <ChatList
          chatList={chatList}
          onSelectChat={setSelectedInterlocutorData}
          onAddChat={handleAddChat}
        />
        <ChatPanel {...chatPanelData} />
      </div>
    </main>
  );
};

export default Chat;
