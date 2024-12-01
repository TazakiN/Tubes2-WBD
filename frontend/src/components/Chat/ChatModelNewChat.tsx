import { useState } from "react";
import { X, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ChatModelNewChatProps {
  onClose: () => void;
}

interface User {
  id: string;
  username: string;
  email: string;
}

function ChatModelNewChat({ onClose }: ChatModelNewChatProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/users/search?q=${query}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative w-full max-w-lg rounded-lg bg-gray-200 p-6">
        <Button
          variant="ghost"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <h2 className="mb-4 text-xl font-bold">Start New Chat</h2>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            autoFocus
          />
        </div>

        <div className="max-h-60 overflow-y-auto">
          {searchResults.map((user: User) => (
            <div
              key={user.id}
              className="cursor-pointer rounded-lg p-3 hover:bg-gray-100"
              onClick={() => {
                // TODO: Add to ChatList and open in ChatPanel
                onClose();
              }}
            >
              <div className="font-medium">{user.username}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          ))}
          <div // ! contoh doang ini harus dihapus
            key={1}
            className="cursor-pointer rounded-lg p-3 hover:bg-gray-100"
            onClick={() => {
              onClose();
            }}
          >
            <div className="font-medium">askdljsalkd</div>
            <div className="text-sm text-gray-500">@alksjdlksadj</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatModelNewChat;
