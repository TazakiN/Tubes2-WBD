import React from "react";
import UserProfile from "@/assets/svg/post-user.svg";
import Edited from "@/assets/svg/post-edited.svg";

interface MessageCardProps {
  from: string;
  timestamp: string;
  content: string;
  editedAt?: string;
}

const MessageCard: React.FC<MessageCardProps> = ({ from, timestamp, content, editedAt }) => {
  return (
    <div className="flex w-[39rem] flex-col rounded-xl bg-gray-lighter p-[1.25rem] drop-shadow">
      <div className="flex flex-row">
        <p className="text-lg">from</p>
        <img src={UserProfile} className="ml-[0.5rem] mr-[0.5rem]" alt="User Profile" />
        <p className="text-lg text-blue-primary">{from}</p>
      </div>

      <div className="mt-[0.5rem] flex flex-row">
        <p className="mr-[3.375rem] text-lg">{timestamp}</p>
        {editedAt && (
          <>
            <img src={Edited} className="mr-[0.5rem]" alt="Edited Icon" />
            <p className="text-lg">{editedAt}</p>
          </>
        )}
      </div>

      <div className="mt-[0.5rem]">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default MessageCard;
