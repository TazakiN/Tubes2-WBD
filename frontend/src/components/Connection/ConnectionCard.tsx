import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { toast } from "sonner";

export interface ConnectionCardProps {
  user_id: bigint;
  full_name: string;
  profile_photo_path: string;
  from_user: boolean;
}

function ConnectionCard({
  user_id,
  full_name,
  profile_photo_path,
  from_user,
}: ConnectionCardProps) {
  const deleteConnection = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/connection",
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
      toast.success("Unconnected");
    },
    onError: () => {
      toast.error("Failed to unconnect");
    },
  });

  const handleUnconnect = () => {
    deleteConnection.mutate();
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
          {from_user && (
            <>
              <Button
                variant={"outline"}
                className="rounded-full border border-gray-300 bg-blue-primary px-3 py-1 text-xl text-gray-lighter"
                onClick={handleUnconnect}
              >
                Unconnect
              </Button>
            </>
          )}
          <>
            <Button
              variant={"outline"}
              className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-xl text-gray-600 hover:bg-gray-100"
            >
              Profile
            </Button>
          </>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
