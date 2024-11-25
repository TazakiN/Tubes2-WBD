import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ProfileLayout } from "@/layouts/ProfileLayout";

const Register = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [username, setUsername] = useState("");
    // const [fullName, setFullName] = useState("");
    // const navigate = useNavigate({ from: "/register" });
  
    // function handleSubmit(e: React.FormEvent): void {
    //   e.preventDefault();
    //   fetch("http://localhost:4001/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, email, password, name: fullName }),
    //   }).then((res) => {
    //     if (res.status === 201) {
    //       toast.success("Registration successful");
    //       navigate({ to: "/" });
    //     } else {
    //       toast.error("Registration failed");
    //       console.error("error: ", res);
    //     }
    //   });
    // }
  
    return (
      <ProfileLayout title="Register Linkinpurry">
          <div>
            <Label htmlFor="name">Username</Label>
            {/* <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> */}
          </div>
  
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            {/* <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="mt-1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            /> */}
          </div>
  
          <div>
            <Label htmlFor="email">Email address</Label>
            {/* <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
          </div>
  
          <div>
            <Label htmlFor="password">Password</Label>
            {/* <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
          </div>
  
          <Button type="submit" className="w-full">
            Register
          </Button>
  
        <p className="mt-6 text-center text-sm text-gray-600">
          Already on Linkinpurry?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign In
          </Link>
        </p>
      </ProfileLayout>
    );
  };
  
  export default Register;
  