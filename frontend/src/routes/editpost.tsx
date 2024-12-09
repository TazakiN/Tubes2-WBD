import EditPost from "@/pages/EditPost";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/editpost')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditPost/>
}
