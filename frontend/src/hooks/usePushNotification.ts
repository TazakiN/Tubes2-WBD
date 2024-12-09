import { useEffect, useState } from "react";
import {
  registerServiceWorker,
  requestNotificationPermission,
  subscribeUser,
} from "@/lib/serviceWorker";

export function usePushNotification() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function setupPushNotification() {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        setIsSupported(true);

        const permissionGranted = await requestNotificationPermission();
        if (!permissionGranted) return;

        const registration = await registerServiceWorker();
        if (!registration) return;

        const subscription = await subscribeUser(registration);
        setIsSubscribed(!!subscription);
      }
    }

    setupPushNotification();
  }, []);

  return {
    isSupported,
    isSubscribed,
  };
}
