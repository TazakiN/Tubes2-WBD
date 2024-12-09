// Convert base64 URL to Uint8Array
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register service worker
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    await navigator.serviceWorker.ready;
    console.log("Service Worker active:", registration.active);

    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) {
    console.warn("Browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("Failed to request notification permission:", error);
    return false;
  }
}

// Subscribe push notification
export async function subscribeUser(
  registration: ServiceWorkerRegistration,
  isAuthenticated: boolean,
): Promise<PushSubscription | null> {
  if (!isAuthenticated) return null;

  try {
    // Check and remove existing subscription
    const existingSubscription =
      await registration.pushManager.getSubscription();
    if (existingSubscription) {
      try {
        // Test if subscription is still valid
        await existingSubscription.getKey("p256dh");
        return existingSubscription; // Return if valid
      } catch {
        await existingSubscription.unsubscribe();
        console.log("Removed invalid subscription");
      }
    }

    // Create new subscription
    const response = await fetch("http://localhost:3000/push/vapid-public-key");
    const { publicKey } = await response.json();

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    // Send to backend
    const subResponse = await fetch("http://localhost:3000/push/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!subResponse.ok) {
      throw new Error(`Subscription failed: ${subResponse.status}`);
    }

    console.log("Push subscription successful");
    return subscription;
  } catch (error) {
    console.error("Push subscription failed:", error);
    return null;
  }
}

// Add backend cleanup for 410 status codes:
export async function cleanupInvalidSubscriptions(
  subscription: PushSubscription,
) {
  await fetch("http://localhost:3000/push/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ endpoint: subscription.endpoint }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
}

// Send test notification
export async function sendTestNotification(title: string, body: string) {
  try {
    const response = await fetch("/push/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      throw new Error("Failed to send notification");
    }

    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}
