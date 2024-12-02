import Connect from "@/pages/Connect";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/connect")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Connect />;
}
