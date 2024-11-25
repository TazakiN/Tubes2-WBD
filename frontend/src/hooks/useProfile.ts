import { useState, useEffect } from "react";
import { UserData } from "@/lib/types/userData";

export const useProfile = () => {
  const [profileData, setProfileData] = useState<UserData | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/profile/info", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data.body);
      } else {
        setProfileData(null);
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      setProfileData(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profileData, refetch: fetchProfile };
};
