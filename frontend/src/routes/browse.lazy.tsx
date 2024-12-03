import Browse from "@/pages/Browse";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/browse")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Browse />;
}
