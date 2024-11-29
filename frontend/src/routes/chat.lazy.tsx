import { createLazyFileRoute } from "@tanstack/react-router";
import ChatPage from "@/pages/ChatPage";

export const Route = createLazyFileRoute("/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatPage />;
}
