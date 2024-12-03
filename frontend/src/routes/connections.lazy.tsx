import Connections from "@/pages/Connections";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/connections")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Connections />;
}
