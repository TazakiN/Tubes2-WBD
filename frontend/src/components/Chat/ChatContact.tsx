import { SelectedInterlocutorData } from "@/pages/Chat";

export type ChatContactProp = {
  interlocutor_id: number;
  username: string;
  profile_photo_path: string;
  last_message: {
    message: string;
    timestamp: Date;
  };
};

function ChatContact({
  contact: chatContextData,
  onSelectChat,
}: {
  contact: ChatContactProp;
  onSelectChat: (SelectedInterlocutorData: SelectedInterlocutorData) => void;
}) {
  return (
    <div
      className="flex h-fit min-w-96 max-w-xs flex-row gap-3 rounded-lg px-4 py-2 text-gray-dark transition-transform duration-200 hover:scale-105 hover:cursor-pointer hover:bg-gray-lighter-hover"
      onClick={() =>
        onSelectChat({
          interlocutor_id: chatContextData.interlocutor_id,
          username: chatContextData.username,
        })
      }
    >
      <img
        src={chatContextData.profile_photo_path}
        alt={chatContextData.username}
        className="size-24 flex-shrink-0 rounded-full p-2"
      />
      <div className="flex max-w-[230px] flex-col justify-center">
        <h2 className="text-2xl">{chatContextData.username}</h2>
        <p className="truncate text-lg">
          {chatContextData.last_message.message}
        </p>
      </div>
    </div>
  );
}

export default ChatContact;
