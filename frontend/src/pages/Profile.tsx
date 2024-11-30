import { useEffect, useState } from "react";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import { ProfileData, CreateProfileData } from "@/lib/types/userData";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const getUserIdFromUrl = () => {
    const pathParts = window.location.pathname.split("/");
    return pathParts[pathParts.length - 1];
  };

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>(
    CreateProfileData({}),
  );
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const user_id = getUserIdFromUrl();
        const requestPath = `${BASE_URL}/profile/${user_id}`;
        const response = await fetch(requestPath, {credentials: "include"});
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
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

  return <ProfileLayout profile={profileData} connection_count={0} />;
};

export default Profile;
