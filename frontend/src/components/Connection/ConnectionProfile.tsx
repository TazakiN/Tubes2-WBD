import UserProfileCircle from "@/assets/svg/user-profile-circle.svg";
import { useQuery } from "@tanstack/react-query";

export interface ConnectionProfileProps {
  user_id?: string;
  connections: number;
}

function ConnectionProfile({ connections, user_id }: ConnectionProfileProps) {
  const fetchProfileInfo = async () => {
    let fetchURL = import.meta.env.VITE_API_BASE_URL + "/profile/info?";
    if (user_id) {
      fetchURL += new URLSearchParams({ user_id });
    }
    const response = await fetch(fetchURL, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const { error, data, isLoading } = useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: ["profileInfoConnecions"],
    queryFn: fetchProfileInfo,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="flex w-2/3 flex-col items-center gap-4 rounded-2xl bg-gray-lighter py-6 text-center text-gray-dark">
      <img
        src={
          data?.data.profile_picture_path
            ? data.data.profile_picture_path
            : UserProfileCircle
        }
        alt="User Profile Picture"
        className="flex size-44 items-center justify-center rounded-full bg-transparent"
      />
      <div>
        <h1 className="text-3xl">{data?.data.username}</h1>
        <span className="text-3xl">Connections: {connections}</span>
      </div>
    </div>
  );
}

export default ConnectionProfile;
