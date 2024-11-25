import { useState } from "react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate({ from: "/login" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { identifier, password };
    fetch("http://localhost:4001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Login successful");
        navigate({ to: "/" });
      } else {
        toast.error("Login failed");
        console.error("error: ", res);
      }
    });
  };

  return (
    <AuthLayout title="Sign in">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="text">Username or Email</Label>
          <Input
            id="identifier"
            name="identifier"
            type="identifier"
            autoComplete="identifier"
            required
            className="mt-1"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your username or email"
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
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Not a member?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Register now
        </Link>
      </p>
    </AuthLayout>
  );
}
