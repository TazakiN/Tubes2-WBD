import Connections from '@/pages/Connections'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/connections/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Connections />
}
