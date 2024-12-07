import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";

export interface ConnectCardProps {
  user_id: bigint;
  full_name: string;
  profile_photo_path: string;
  status: string;
  refetch: () => void;
}

const ConnectCard: React.FC<ConnectCardProps> = ({
  user_id,
  full_name,
  profile_photo_path,
  status,
  refetch,
}) => {
  const createConnectionRequest = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/connection_request",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to_id: user_id.toString(),
          }),
        },
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Connection request sent");
      refetch();
    },
    onError: (error: Error) => {
      if (error.message === "Unauthorized") {
        toast.error("You must be logged in to send connection request");
      } else {
        toast.error("Failed to send connection request");
      }
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/connection_request/accept",
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
        import.meta.env.VITE_API_BASE_URL + "/connection_request/reject",
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

  const cancelConnectionRequest = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/connection_request",
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to_id: user_id.toString(),
          }),
        },
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Connection request cancelled");
      refetch();
    },
    onError: () => {
      toast.error("Failed to cancel connection request");
    },
  });

  const handleAccept = () => {
    acceptMutation.mutate();
  };

  const handleDecline = () => {
    declineMutation.mutate();
  };

  const handleConnect = () => {
    createConnectionRequest.mutate();
  };

  const handleCancelConnectionRequest = () => {
    cancelConnectionRequest.mutate();
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
        <div className="mt-4 flex gap-2">
          {status === "Outgoing" && (
            <>
              <Button
                className="rounded-full border border-gray-300 bg-green px-2 py-1 text-xl text-gray-lighter"
                variant={"outline"}
                onClick={handleCancelConnectionRequest}
              >
                Pending
              </Button>
              <Button
                variant="outline"
                className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-xl"
              >
                Profile
              </Button>
            </>
          )}
          {status === "Incoming" && (
            <>
              <Button
                variant={"outline"}
                className="rounded-full border border-gray-300 bg-green px-3 py-1 text-xl text-gray-lighter"
                onClick={handleAccept}
              >
                Accept
              </Button>
              <Button
                variant={"outline"}
                className="rounded-full border border-gray-300 bg-red px-3 py-1 text-xl text-gray-lighter"
                onClick={handleDecline}
              >
                Decline
              </Button>
            </>
          )}
          {status === "Connected" && (
            <>
              <span className="bg-blue rounded-full bg-blue-primary px-2 py-1 text-xl text-gray-lighter">
                Linked
              </span>
              <Button
                variant={"outline"}
                className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-xl text-gray-600 hover:bg-gray-100"
              >
                Profile
              </Button>
            </>
          )}
          {status === "Not Connected" && (
            <>
              <Button
                variant={"outline"}
                className="rounded-full border border-gray-300 bg-blue-primary px-3 py-1 text-xl text-gray-lighter"
                onClick={handleConnect}
              >
                Connect
              </Button>
              <Button
                variant={"outline"}
                className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-xl text-gray-600 hover:bg-gray-100"
              >
                Profile
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectCard;
