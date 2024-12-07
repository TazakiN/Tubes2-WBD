import ProfileEdit from '@/pages/ProfileEdit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfileEdit />
}
