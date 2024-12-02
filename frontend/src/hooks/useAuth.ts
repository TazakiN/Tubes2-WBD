import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import { UserData } from "@/lib/types/userData";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAuth = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [profileData, setProfileData] = useState<UserData | null>(null);

  const { error, data, refetch } = useQuery({
    staleTime: 1000 * 60 * 5,
    queryKey: ["userData"],
    queryFn: () =>
      fetch("http://localhost:4001/api/profile/info", {
        credentials: "include",
      }).then((res) => {
        if (res.status === 401) {
          setUserData(null);
          setProfileData(null);
          throw new Error("Profile not found");
        }
        return res.json();
      }),
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
      setProfileData(data);
    }
  }, [data, setUserData]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch profile data");
    }
  }, [error]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      setUserData(null);
      setProfileData(null);
      const queryClient = new QueryClient();
      const queryKey = ["userData"];
      queryClient.removeQueries({ queryKey, exact: true });
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return {
    isAuthenticated: Boolean(userData),
    userData,
    profileData,
    logout,
    refetch,
  };
};
