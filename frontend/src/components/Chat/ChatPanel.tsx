import { useNavigate } from "@tanstack/react-router";
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

  function handleMessageSubmit(message: string): void {
    console.log("Message sent:", message);
  }
  return (
    <div className="flex w-[600px] flex-grow flex-col rounded-lg bg-gray-lighter">
      <div className="rounded-t-xl bg-blue-secondary px-10 py-5">
        <h3
          className="cursor-pointer truncate text-2xl text-gray-lighter transition-all duration-300 ease-in-out hover:text-3xl"
          onClick={() => navigate({ to: "/" })}
        >
          {chatPanelProps.name}
        </h3>
      </div>
      <div className="flex-grow bg-gray-lighter">
        <div className="flex flex-col gap-4 p-4">
          {chatPanelProps.chats.map((chat) => (
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
        </div>
      </div>
      <ChatInput onSubmit={handleMessageSubmit} />
    </div>
  );
}

export default ChatPanel;
