import Register from "@/pages/Register";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Register />;
}
