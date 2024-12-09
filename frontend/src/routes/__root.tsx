import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePushNotification } from "@/hooks/usePushNotification";

const NotificationWrapper = () => {
  const { isSupported, isSubscribed } = usePushNotification();

  useEffect(() => {
    if (isSupported && !isSubscribed) {
      // Setup notifikasi
    }
  }, [isSupported, isSubscribed]);

  return null;
};

// It's the layout component
export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
      <NotificationWrapper />
      <Toaster richColors expand />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
