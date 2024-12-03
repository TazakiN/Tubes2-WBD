import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConnectionCard, {
  ConnectionCardProps,
} from "@/components/Connect/ConnectionCard";
import { useQuery } from "@tanstack/react-query";

function Connect() {
  const [typeSelected, setTypeSelected] = useState("Outgoing");

  const { error, data, refetch } = useQuery({
    queryKey: ["userData", typeSelected],
    queryFn: () =>
      fetch(
        "http://localhost:4001/api/connection_request?" +
          new URLSearchParams({ type: typeSelected }),
        {
          credentials: "include",
        },
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

  useEffect(() => {
    refetch();
  }, [typeSelected, refetch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-light px-80 text-gray-dark">
      <h1 className="mt-16 text-6xl">Connections</h1>
      <div className="x-64 my-4 flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-gray-lighter py-2 drop-shadow">
        <h2 className="text-center text-2xl">Invitations</h2>
        <Select
          value={typeSelected}
          onValueChange={setTypeSelected}
          defaultValue="Outgoing"
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Outgoing" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Outgoing">Outgoing</SelectItem>
            <SelectItem value="Incoming">Incoming</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((connection: ConnectionCardProps, index: number) => (
          <ConnectionCard key={index} {...connection} refetch={refetch} />
        ))}
      </div>
    </main>
  );
}

export default Connect;
