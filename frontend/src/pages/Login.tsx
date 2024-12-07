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
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const profileResponse = await fetch(
          import.meta.env.VITE_API_BASE_URL + "/profile/info",
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
    <AuthLayout>
      <div className="mx-auto flex size-32 items-center justify-center rounded-lg bg-blue-primary text-white">
        {" "}
      </div>
      <div className="my-4">
        <h1 className="text-2xl font-semibold">Welcome to Linkinpurry 2.0</h1>
        <h2 className="text-base">
          Please Enter your identifiers and password to sign in
        </h2>
      </div>
      <form className="space-y-6 text-left" onSubmit={handleSubmit}>
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
            className="mt-1 bg-gray-dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded bg-red px-4 py-2 font-normal text-white hover:bg-orange-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Logging in...
            </div>
          ) : (
            "LOGIN"
          )}
        </Button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-2 border-gray-dark" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-lighter px-2 text-base text-gray-600">
            OR
          </span>
        </div>
      </div>

      <Link to="/register">
        <Button
          type="submit"
          className="w-full rounded bg-blue-secondary px-4 py-2 font-normal text-white hover:bg-blue-600"
          disabled={isLoading}
        >
          REGISTER
        </Button>
      </Link>
    </AuthLayout>
  );
}
