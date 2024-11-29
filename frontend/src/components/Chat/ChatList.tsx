import ChatContext, { ChatContextProp } from "./ChatContact";

function ChatList() {
  // TODO: fetch chatContact
  const chatList: ChatContextProp[] = [
    {
      id: 1,
      name: "John Doe",
      image: "/person.svg",
      lastMessage: "Hello, how are you?",
    },
    {
      id: 2,
      name: "Jane Doe",
      image: "/person.svg",
      lastMessage: "I'm fine, thank you.",
    },
  ];

  return (
    <div className="divide-y-2 divide-gray-dark rounded-lg bg-gray-lighter drop-shadow-xl">
      {chatList.map((chatContextData) => {
        return (
          <div key={chatContextData.id}>
            <ChatContext key={chatContextData.id} contact={chatContextData} />
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
