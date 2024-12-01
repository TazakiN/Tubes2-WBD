import { useState, useEffect, useCallback } from "react";
import ChatList from "@/components/Chat/ChatList";
import ChatPanel, { ChatPanelProp } from "@/components/Chat/ChatPanel";
import { ChatContactProp } from "@/components/Chat/ChatContact";

export type SelectedInterlocutorData = {
  interlocutor_id: number;
  username: string;
};

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [selectedInterlocutorData, setSelectedInterlocutorData] =
    useState<SelectedInterlocutorData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatList, setChatList] = useState<ChatContactProp[]>([]);

  const sendMessage = useCallback(
    (message: string) => {
      if (ws && ws.readyState === WebSocket.OPEN && selectedInterlocutorData) {
        ws.send(
          JSON.stringify({
            to_id: selectedInterlocutorData.interlocutor_id.toString(),
            message,
          }),
        );

        setChatPanelData((prev) => ({
          ...prev,
          chats: [
            ...prev.chats,
            {
              id: Date.now().toString(),
              from_id: "You",
              to_id: selectedInterlocutorData.interlocutor_id.toString(),
              message,
              timestamp: new Date(),
            },
          ],
        }));

        setChatList((prevChatList) =>
          prevChatList.map((chat) =>
            chat.interlocutor_id === selectedInterlocutorData.interlocutor_id
              ? { ...chat, lastMessage: message, timestamp: new Date() }
              : chat,
          ),
        );
      }
    },
    [ws, selectedInterlocutorData],
  );

  const [chatPanelData, setChatPanelData] = useState<ChatPanelProp>({
    name: "Please select a chat",
    chats: [],
    interlocutor_id: "",
    onSendMessage: sendMessage,
  });

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:4001/ws");

    webSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // update chat di chat panel
      if (
        selectedInterlocutorData?.interlocutor_id.toString() === data.from_id
      ) {
        setChatPanelData((prev) => ({
          ...prev,
          chats: [...prev.chats, data],
        }));
      }

      // update chat list yang terakhir diupdate
      setChatList((prevChatList) =>
        prevChatList.map((chat) =>
          chat.interlocutor_id.toString() === data.from_id
            ? { ...chat, lastMessage: data.message, timestamp: new Date() }
            : chat,
        ),
      );
    };

    webSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, [selectedInterlocutorData?.interlocutor_id]);

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
              interlocutor_id:
                selectedInterlocutorData.interlocutor_id.toString(),
              onSendMessage: sendMessage,
            });
          }
        } catch (error) {
          console.error("Error fetching chat panel data:", error);
        }
      };

      fetchChatPanelData();
    }
  }, [selectedInterlocutorData, sendMessage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-light px-64 py-6">
      <div className="w-full rounded-lg bg-gray-lighter px-12 py-4 drop-shadow-lg">
        <h1 className="text-left text-3xl text-gray-dark">Messages</h1>
      </div>
      <div className="flex flex-grow flex-row gap-8">
        <ChatList
          onSelectChat={setSelectedInterlocutorData}
          onNewMessage={(data) => setChatList(data)}
        />
        <ChatPanel {...chatPanelData} onSendMessage={sendMessage} />
      </div>
    </main>
  );
};

export default Chat;
