self.addEventListener("push", (event) => {
  console.log("Push event received:", event.data?.json());
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration
      .showNotification(data.title, options)
      .catch((error) => console.error("Error showing notification:", error)),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    }),
  );
});
