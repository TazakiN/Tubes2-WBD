export type ChatContextProp = {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
};

function ChatContext({
  contact: chatContextData,
}: {
  contact: ChatContextProp;
}) {
  return (
    <div className="hover:bg-gray-lighter-hover flex min-w-96 max-w-xs flex-row rounded-lg px-4 py-2 text-gray-dark transition-transform duration-200 hover:scale-105 hover:cursor-pointer">
      <div className="flex-shrink-0 rounded-full p-2">
        <img
          src={chatContextData.image}
          alt={chatContextData.name}
          className="size-24"
        />
      </div>
      <div className="flex max-w-[230px] flex-col justify-center">
        <h2 className="text-2xl">{chatContextData.name}</h2>
        <p className="truncate text-lg">{chatContextData.lastMessage}</p>
      </div>
    </div>
  );
}

export default ChatContext;
