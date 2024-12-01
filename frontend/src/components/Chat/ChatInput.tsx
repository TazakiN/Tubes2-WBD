import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type ChatInputProps = {
  onSubmit: (message: string) => void;
};

function ChatInput({ onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmitMessage(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (message.trim() === "") return;
    onSubmit(message);
    setMessage("");
  }

  return (
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
  );
}

export default ChatInput;
