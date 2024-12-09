import { useEffect, useState, useCallback } from "react";
import {
  registerServiceWorker,
  requestNotificationPermission,
  subscribeUser,
} from "@/lib/serviceWorker";
import { useAuth } from "./useAuth";

export function usePushNotification() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { isAuthenticated } = useAuth();

  const setupPushNotification = useCallback(async () => {
    if (!("serviceWorker" in navigator && "PushManager" in window)) {
      return;
    }

    setIsSupported(true);

    if (!isAuthenticated) return;

    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) return;

    const registration = await registerServiceWorker();
    if (!registration) return;

    const subscription = await subscribeUser(registration, isAuthenticated);
    setIsSubscribed(!!subscription);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setupPushNotification();
    }
  }, [isAuthenticated, setupPushNotification]);

  return { isSupported, isSubscribed, setup: setupPushNotification };
}
