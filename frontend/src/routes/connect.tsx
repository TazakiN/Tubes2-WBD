import Connect from "@/pages/Connect";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/connect")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Connect />;
}
