import Profile from '@/pages/Profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$user_id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
