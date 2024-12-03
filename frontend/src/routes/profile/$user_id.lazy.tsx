import Profile from '@/pages/Profile';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/profile/$user_id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />;
}
