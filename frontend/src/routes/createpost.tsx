import CreatePost from "@/pages/CreatePost";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/createpost')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreatePost/>
}
