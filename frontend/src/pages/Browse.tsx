import ConnectCard from "@/components/Connect/ConnectCard";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

interface User {
  user_id: bigint;
  full_name: string;
  profile_photo_path: string;
  status: string;
}

const Route = getRouteApi("/browse");

function Browse() {
  const { query } = Route.useSearch();
  const { data, isError, isLoading, refetch } = useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: ["users", query],
    queryFn: async () => {
      let url = import.meta.env.VITE_API_BASE_URL + "/users";

      if (query) {
        url += "?" + new URLSearchParams({ query }).toString();
      }

      const res = await fetch(url.toString(), {
        credentials: "include",
      });
      const data = await res.json();
      return {
        ...data,
        data: data.data.map((user: User) => ({
          ...user,
          user_id: BigInt(user.user_id),
        })),
      };
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-light px-80 text-gray-dark">
      <h1 className="mb-12 mt-16 text-6xl">
        Browse {isLoading ? "..." : data.user_count} Numbers of Users
      </h1>
      <div>
        {isError ? (
          <p>Error fetching users</p>
        ) : (
          <div className="mt-2 grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((user: User) => (
              <ConnectCard
                key={user.user_id}
                user_id={user.user_id}
                full_name={user.full_name}
                profile_photo_path={user.profile_photo_path}
                status={user.status}
                refetch={refetch}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Browse;
