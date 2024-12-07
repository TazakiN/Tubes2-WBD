import { useState } from "react";
import ChatContact, { ChatContactProp } from "./ChatContact";
import { SelectedInterlocutorData } from "@/pages/Chat";
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import ChatModelNewChat from "./ChatModelNewChat";

function ChatList({
  chatList,
  onSelectChat,
  onAddChat,
}: {
  chatList: ChatContactProp[];
  onSelectChat: (data: SelectedInterlocutorData) => void;
  onAddChat: (newChat: ChatContactProp) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-7 flex-col gap-2">
      <Button
        className="text-xl text-gray-dark"
        variant="ghost"
        onClick={() => setIsModalOpen(true)}
      >
        <CirclePlus /> Add new chat
      </Button>
      <div className="flex h-[555px] max-w-sm flex-col divide-y-2 divide-gray-dark overflow-y-auto rounded-lg bg-gray-lighter drop-shadow-xl">
        {chatList.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-8 py-4 text-center text-3xl">
            <span className="text-3xl text-gray-600">No chat history</span>
            <span className="text-lg text-gray-400">
              Start a new chat to start chatting
            </span>
          </div>
        ) : (
          chatList.map((chatContextData) => (
            <ChatContact
              key={chatContextData.interlocutor_id}
              contact={chatContextData}
              onSelectChat={onSelectChat}
            />
          ))
        )}
      </div>
      {isModalOpen && (
        <ChatModelNewChat
          onClose={handleCloseModal}
          onAddChat={onAddChat}
          onSelectChat={onSelectChat}
        />
      )}
    </div>
  );
}

export default ChatList;
