import { useEffect, useState } from "react";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import { ProfileData, DefaultProfile } from "@/lib/types/userData";
import default_profile_picture from "@/assets/img/default-profile-picture.jpg";
import { toast } from "sonner";

const Profile = () => {
  const getUserIdFromUrl = () => {
    const pathParts = window.location.pathname.split("/");
    return pathParts[pathParts.length - 1];
  };

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>(
    DefaultProfile({
      username: "",
      profile_photo: default_profile_picture,
      name: "",
      work_history: "",
      skills: "",
      connection_count: 0,
    }),
  );
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const user_id = getUserIdFromUrl();
        const response = await fetch(`/api/profile/${user_id}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setProfileData(data);
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

  return <ProfileLayout profile={profileData} />;
};

export default Profile;
