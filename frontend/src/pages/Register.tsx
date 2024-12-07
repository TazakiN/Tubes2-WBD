import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useState, useContext } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { UserDataContext } from "@/contexts/UserDataContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate({ from: "/register" });

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, name: fullName }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);

        if (errorData.error.name === "ZodError") {
          throw new z.ZodError(errorData.error.issues);
        }

        throw new Error(errorData.message || "Registration failed");
      }
      return response.json();
    },
    onSuccess: async () => {
      const profileResponse = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/profile/info",
        {
          credentials: "include",
        },
      );

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUserData(profileData.body);
        toast.success("Registration successful");
        navigate({ to: "/" });
      }
    },
    onError: (error: z.ZodError | Error) => {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
      } else {
        toast.error(error.message || "Registration failed");
      }
      setIsLoading(false);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    registerMutation.mutate();
  };

  return (
    <AuthLayout>
      <h1 className="mb-4 text-2xl">Create an Account</h1>
      <form className="space-y-6 text-left" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className="mt-1"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="mt-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              Registering...
            </div>
          ) : (
            "REGISTER"
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

      <Link to="/login">
        <Button
          type="submit"
          className="w-full rounded bg-blue-secondary px-4 py-2 font-normal text-white hover:bg-blue-600"
          disabled={isLoading}
        >
          LOGIN
        </Button>
      </Link>
    </AuthLayout>
  );
};

export default Register;
