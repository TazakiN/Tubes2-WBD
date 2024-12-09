import { useEffect } from "react";
import { usePushNotification } from "./hooks/usePushNotification";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { isSupported, isSubscribed } = usePushNotification();

  useEffect(() => {
    if (isSupported) {
      console.log(
        "Push Notification:",
        isSubscribed ? "Berhasil didaftarkan" : "Belum didaftarkan",
      );
    }
  }, [isSupported, isSubscribed]);

  return <RouterProvider router={router} />;
}
