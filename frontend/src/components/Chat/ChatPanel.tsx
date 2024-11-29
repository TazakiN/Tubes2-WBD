import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "@tanstack/react-router";

export type Chat = {
  id: number;
  from_id: bigint;
  to_id: bigint;
  message: string;
  timestamp: Date;
};

export type ChatPanelProp = {
  name: string;
  chats: Chat[];
};

function ChatPanel({ name, chats }: ChatPanelProp) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate({ from: "/chat" });

  function handleSubmitMessage(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (message.trim() === "") return;
    console.log("Message sent:", message);
    setMessage("");
  }

  return (
    <div className="flex w-[600px] flex-grow flex-col rounded-lg bg-gray-lighter">
      <div className="rounded-t-xl bg-blue-secondary px-10 py-5">
        <h3
          className="cursor-pointer truncate text-2xl text-gray-lighter transition-all duration-300 ease-in-out hover:text-3xl"
          onClick={() => navigate({ to: "/" })}
        >
          {name}
        </h3>
      </div>
      <div className="flex-grow bg-gray-lighter">
        <div className="flex flex-col gap-4 p-4"></div>
      </div>
      <form
        className="flex flex-row gap-6 rounded-b-xl bg-blue-secondary p-8 pl-4 pt-4"
        onSubmit={handleSubmitMessage}
      >
        <div className="flex-grow rounded-xl bg-gray-lighter">
          <Input
            type="text"
            className="rounded-xl border-none bg-gray-lighter px-4 py-2 outline-none"
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button
          className="rounded-xl bg-blue-primary text-gray-lighter"
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default ChatPanel;
