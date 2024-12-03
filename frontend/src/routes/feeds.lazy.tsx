import Feeds from '@/pages/Feeds'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/feeds')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Feeds/>
}
