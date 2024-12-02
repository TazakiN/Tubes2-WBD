import { useState } from "react";
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

function Connect() {
  // Dummy data
  const connections: ConnectionCardProps[] = [
    {
      name: "John Doe",
      status: "Incoming",
    },
    {
      name: "Jane Doe",
      status: "Incoming",
    },
    {
      name: "John Smith",
      status: "Incoming",
    },
    {
      name: "Jane Smith",
      status: "Incoming",
    },
    {
      name: "John Doe",
      status: "Incoming",
    },
    {
      name: "Jane Doe",
      status: "Incoming",
    },
    {
      name: "John Smith",
      status: "Incoming",
    },
    {
      name: "Jane Smith",
      status: "Outgoing",
    },
  ];
  const [selected, setSelected] = useState("Outgoing");
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-light px-80 text-gray-dark">
      <h1 className="mt-16 text-6xl">Connections</h1>
      <div className="x-64 my-4 flex w-full flex-col items-center justify-center rounded-xl bg-gray-lighter py-4">
        <h2 className="text-center text-2xl">Invitations</h2>
        <Select
          value={selected}
          onValueChange={setSelected}
          defaultValue="Outgoing"
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Outgoing" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="dark">Outgoing</SelectItem>
            <SelectItem value="light">Incoming</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection, index) => (
          <ConnectionCard key={index} {...connection} />
        ))}
      </div>
    </main>
  );
}

export default Connect;
