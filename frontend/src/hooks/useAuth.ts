import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/verify`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const result = await response.json();
      return result.body;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Logout gagal");
      }

      queryClient.removeQueries({ queryKey: ["verify"], exact: true });
      queryClient.clear();

      navigate({ to: "/login" });

      toast.success("Logout berhasil");
    } catch (error) {
      console.error("Logout gagal:", error);
      toast.error("Logout gagal. Silakan coba lagi.");
    }
  };

  return {
    isAuthenticated: !isError && !!data && data.success !== false,
    isLoading,
    logout,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["verify"] }),
  };
};
