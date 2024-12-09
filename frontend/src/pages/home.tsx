import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePushNotification } from "@/hooks/usePushNotification";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate({ from: "/" });
  const { isSupported, isSubscribed } = usePushNotification();

  useEffect(() => {
    if (isSupported && !isSubscribed) {
      // Setup notifikasi
    }
  }, [isSupported, isSubscribed]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-grow flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="mb-4 text-4xl font-bold">Welcome to LinkinPurry</h1>
        <p className="mb-4 text-lg">
          Connect with professionals{" "}
          <span className="text-red-500">around</span> the world
        </p>
        <Link to="/login">
          <Button
            className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
            onClick={handleLogout}
            variant="destructive"
          >
            Logout
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
