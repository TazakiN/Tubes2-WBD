import Browse from "@/pages/Browse";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const serachQuerySchema = z.object({
  query: z.string().default(""),
});
export const Route = createFileRoute("/browse")({
  validateSearch: (search) => serachQuerySchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <Browse />;
}
