import { useContext } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import { toast } from "sonner";

export const useAuth = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const isAuthenticated = Boolean(userData);

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
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    userData,
    logout,
  };
};
