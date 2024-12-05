import UserProfileCircle from "@/assets/svg/user-profile-circle.svg";
import ConnectionCard, {
  ConnectionCardProps,
} from "@/components/Connection/ConnectionCard";
import { useQuery } from "@tanstack/react-query";

function Connections() {
  // TODO : Fetch user profile picture from backend
  const fetchAllConnection = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + "/connection/info",
      {
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const { error, data, isLoading } = useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: ["connection"],
    queryFn: fetchAllConnection,
  });

  const profile_picture_path = null;

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-light px-80 py-6 text-gray-dark">
        <div className="loader">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-light px-80 py-6 text-gray-dark">
        <div className="text-red-500">Error: {error.message}</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-light px-80 py-6 text-gray-dark">
      <div className="flex w-2/3 flex-col items-center gap-4 rounded-2xl bg-gray-lighter py-6 text-center text-gray-dark">
        <img
          src={profile_picture_path ? profile_picture_path : UserProfileCircle}
          alt="User Profile Picture"
          className="flex size-44 items-center justify-center rounded-full bg-transparent"
        />
        <div>
          <h1 className="text-3xl">Zaki Yudistira Candra</h1>
          <span className="text-3xl">Connections: {data.length}</span>
        </div>
      </div>

      {data.data.map((connection: ConnectionCardProps) => (
        <ConnectionCard
          key={connection.user_id}
          user_id={connection.user_id}
          full_name={connection.full_name}
          profile_photo_path={connection.profile_photo_path}
          from_user={data.from_user}
        />
      ))}
    </main>
  );
}

export default Connections;
