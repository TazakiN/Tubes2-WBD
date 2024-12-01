export type ChatBubbleProps = {
  username: string;
  message: string;
  timestamp: Date;
  from_user: boolean;
};

function ChatBubble(chat: ChatBubbleProps) {
  const timestamp = new Date(chat.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`flex ${chat.from_user ? "justify-end" : "justify-start"} w-full`}
    >
      {chat.from_user && (
        <span className="mr-4 flex items-end justify-end text-sm italic text-gray-500">
          {timestamp}
        </span>
      )}
      <div>
        <div className="text-gray-dark">
          <div
            className={`mb-1 flex items-center justify-between ${chat.from_user ? "flex-row-reverse" : ""}`}
          >
            <h4 className={`text-xl font-bold`}>{chat.username}</h4>
          </div>
          <p className="break-words text-lg text-gray-800">{chat.message}</p>
        </div>
      </div>{" "}
      {!chat.from_user && (
        <span className="ml-2 flex items-end justify-end text-sm italic text-gray-500">
          {timestamp}
        </span>
      )}
    </div>
  );
}

export default ChatBubble;
