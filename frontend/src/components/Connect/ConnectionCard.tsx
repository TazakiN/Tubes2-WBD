import React from "react";

export interface ConnectionCardProps {
  user_id: bigint;
  username: string;
  profile_photo_path: string;
  status: string;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  username,
  profile_photo_path,
  status,
}) => {
  return (
    <div className="flex w-64 flex-col items-center overflow-hidden rounded-lg bg-gray-lighter shadow-md">
      <div className="h-16 w-full bg-blue-secondary"></div>
      <img
        src={profile_photo_path}
        alt="profile"
        className="-mt-8 h-16 w-16 rounded-full"
      />
      <div className="pb-4 text-center">
        <h3 className="text-2xl">{username}</h3>
        <div className="mt-2 flex gap-2 text-xl">
          {status === "Outgoing" ? (
            <>
              <span className="rounded-full bg-green px-2 py-1 text-gray-lighter">
                Pending
              </span>
              <button className="rounded-full border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-100">
                Profile
              </button>
            </>
          ) : (
            <>
              <button className="rounded-full border border-gray-300 bg-green px-3 py-1 text-gray-lighter hover:bg-accent hover:text-accent-foreground">
                Accept
              </button>
              <button className="rounded-full border border-gray-300 bg-red px-3 py-1 text-gray-lighter hover:bg-accent hover:text-accent-foreground">
                Decline
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
