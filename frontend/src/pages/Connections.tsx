import ConnectionCard, {
  ConnectionCardProps,
} from "@/components/Connection/ConnectionCard";
import ConnectionProfile from "@/components/Connection/ConnectionProfile";
import { useQuery } from "@tanstack/react-query";

export interface ConnectionPageProps {
  userId?: string;
}

function Connections({ userId }: ConnectionPageProps) {
  const fetchAllConnection = async () => {
    let fetchURL = import.meta.env.VITE_API_BASE_URL + "/connection/info?";
    if (userId) {
      fetchURL += new URLSearchParams({ user_id: userId });
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
    queryKey: ["connection"],
    queryFn: fetchAllConnection,
  });

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
    <main className="flex min-h-screen flex-col items-center bg-gray-light px-80 py-8 text-gray-dark">
      <ConnectionProfile connections={data.data.length} user_id={userId} />
      <div className="my-8 flex flex-wrap gap-12">
        {data.data.map((connection: ConnectionCardProps) => (
          <ConnectionCard
            key={connection.user_id}
            user_id={connection.user_id}
            full_name={connection.full_name}
            profile_photo_path={connection.profile_photo_path}
            from_user={data.from_user}
          />
        ))}
      </div>
    </main>
  );
}

export default Connections;
