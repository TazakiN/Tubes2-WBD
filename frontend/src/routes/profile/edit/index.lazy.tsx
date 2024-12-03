import ProfileEdit from '@/pages/ProfileEdit'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/profile/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfileEdit />
}
