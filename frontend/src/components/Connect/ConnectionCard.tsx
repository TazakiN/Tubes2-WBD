import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export interface ConnectionCardProps {
  user_id: bigint;
  full_name: string;
  profile_photo_path: string;
  status: string;
  refetch: () => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  user_id,
  full_name,
  profile_photo_path,
  status,
  refetch,
}) => {
  const acceptMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "http://localhost:4001/api/connection_request/accept",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from_id: user_id.toString(),
          }),
        },
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Connection request accepted");
      refetch();
    },
    onError: () => {
      toast.error("Failed to accept connection request");
    },
  });

  const declineMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "http://localhost:4001/api/connection_request/reject",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from_id: user_id,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to decline connection request");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Connection request declined");
      refetch();
    },
    onError: () => {
      toast.error("Failed to decline connection request");
    },
  });

  const handleAccept = () => {
    acceptMutation.mutate();
  };

  const handleDecline = () => {
    declineMutation.mutate();
  };

  return (
    <div className="flex w-64 flex-col items-center overflow-hidden rounded-lg bg-gray-lighter shadow-md">
      <div className="h-16 w-full bg-blue-secondary"></div>
      <img
        src={profile_photo_path}
        alt="profile"
        className="-mt-8 h-16 w-16 rounded-full"
      />
      <div className="pb-4 text-center">
        <h3 className="text-2xl">{full_name}</h3>
        <div className="mt-4 flex gap-2 text-xl">
          {status === "Outgoing" && (
            <>
              <span className="rounded-full bg-green px-2 py-1 text-gray-lighter">
                Pending
              </span>
              <button className="rounded-full border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-100">
                Profile
              </button>
            </>
          )}
          {status === "Incoming" && (
            <>
              <button
                className="rounded-full border border-gray-300 bg-green px-3 py-1 text-gray-lighter hover:bg-accent hover:text-accent-foreground"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="rounded-full border border-gray-300 bg-red px-3 py-1 text-gray-lighter hover:bg-accent hover:text-accent-foreground"
                onClick={handleDecline}
              >
                Decline
              </button>
            </>
          )}
          {status === "Connected" && (
            <>
              <span className="bg-blue rounded-full bg-blue-primary px-2 py-1 text-gray-lighter">
                Linked
              </span>
              <button className="rounded-full border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-100">
                Profile
              </button>
            </>
          )}
          {status === "Not Connected" && (
            <>
              <button className="rounded-full border border-gray-300 bg-blue-primary px-3 py-1 text-gray-lighter hover:bg-accent hover:text-accent-foreground">
                Connect
              </button>
              <button className="rounded-full border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-100">
                Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
