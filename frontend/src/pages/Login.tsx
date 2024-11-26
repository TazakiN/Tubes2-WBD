import { useState, useContext } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { identifier, password };
      const response = await fetch("http://localhost:4001/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const profileResponse = await fetch(
          "http://localhost:4001/api/profile/info",
          {
            credentials: "include",
          },
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUserData(profileData.body);
          toast.success("Login successful");
          navigate({ to: "/" });
        }
      } else {
        const data = await response.json();
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="identifier">Username or Email</Label>
          <Input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            required
            className="mt-1"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your username or email"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Signing in...
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Not a member?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:text-blue-500"
          disabled={isLoading}
        >
          Register now
        </Link>
      </p>
    </AuthLayout>
  );
}
