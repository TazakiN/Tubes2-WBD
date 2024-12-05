import Connections from "@/pages/Connections";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/connections/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  return <Connections userId={userId} />;
}
