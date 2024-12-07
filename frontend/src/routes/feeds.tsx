import Feeds from '@/pages/Feeds'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feeds')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Feeds />
}
