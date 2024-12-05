import { useState, useCallback } from "react";
import { X, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { ChatContactProp } from "./ChatContact";
import { SelectedInterlocutorData } from "@/pages/Chat";

interface ChatModelNewChatProps {
  onClose: () => void;
  onAddChat: (newChat: ChatContactProp) => void;
  onSelectChat: (data: SelectedInterlocutorData) => void;
}

interface User {
  user_id: string;
  username: string;
  email: string;
  profile_photo_path: string;
}

function ChatModelNewChat({
  onClose,
  onAddChat,
  onSelectChat,
}: ChatModelNewChatProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const searchUsers = async (query: string) => {
    if (!query) return [];
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL +
        "/chat/search-connected-users?" +
        new URLSearchParams({ username: query }),
      {
        credentials: "include",
      },
    );
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error("Failed to fetch users");
  };

  const { data: searchResults = [], isError } = useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: () => searchUsers(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const timeoutId = setTimeout(() => {
      setSearchQuery(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

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
            onChange={handleSearch}
            autoFocus
          />
        </div>

        <div className="max-h-60 overflow-y-auto">
          {isError ? (
            <div className="text-red-500 p-3">Error fetching users</div>
          ) : (
            searchResults.map((user: User) => (
              <div
                key={user.user_id}
                className="cursor-pointer rounded-lg p-3 hover:bg-gray-100"
                onClick={() => {
                  const newChat = {
                    interlocutor_id: Number(user.user_id),
                    username: user.username,
                    profile_photo_path: user.profile_photo_path,
                    last_message: {
                      message: "",
                      timestamp: new Date(),
                    },
                  };
                  onAddChat(newChat);
                  onSelectChat({
                    interlocutor_id: Number(user.user_id),
                    username: user.username,
                  });
                  onClose();
                }}
              >
                <div className="font-medium">{user.username}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatModelNewChat;
