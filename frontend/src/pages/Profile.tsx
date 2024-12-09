import { useEffect, useState } from "react";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import { ProfileData } from "@/lib/types/userData";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const getUserIdFromUrl = () => {
    const pathParts = window.location.pathname.split("/");
    return pathParts[pathParts.length - 1];
  };

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [owner, setOwner] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        let user_id = getUserIdFromUrl();

        if (user_id == "profile") {
          const response = await fetch(`${BASE_URL}/profile/info`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("User not found");
          const data = await response.json();
          setAuthenticated(true);
          user_id = `/${data.data.id}`;
        } else {
          user_id = `/${user_id}`;
        }

        const requestPath = `${BASE_URL}/profile${user_id}`;
        const response = await fetch(requestPath, { credentials: "include" });
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setAuthenticated(data.message != "Unauthenticated");
        setOwner(data.message == "Owner");
        setProfileData(data.body);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ProfileLayout
      profile={profileData}
      authenticated={authenticated}
      owner={owner}
    />
  );
};

export default Profile;
