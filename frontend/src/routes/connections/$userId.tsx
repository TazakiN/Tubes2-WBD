import Connections from '@/pages/Connections'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/connections/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  return <Connections userId={userId} />
}
