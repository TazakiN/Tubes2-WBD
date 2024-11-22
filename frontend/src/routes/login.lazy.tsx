import { createLazyFileRoute } from "@tanstack/react-router";
import Login from "@/pages/Login";

export const Route = createLazyFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
