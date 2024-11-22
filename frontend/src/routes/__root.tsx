import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

// It's the layout component
export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
