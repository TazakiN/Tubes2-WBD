import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import TextArea from "@/components/ui/text-area";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jobHistory, setJobHistory] = useState("");
  const [skills, setSkills] = useState("");
  // const navigate = useNavigate();

  const getUserIdFromUrl = () => {
    const pathParts = window.location.pathname.split("/");
    return pathParts[pathParts.length - 1];
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const user_id = getUserIdFromUrl();
        const requestPath = `${BASE_URL}/profile/${user_id}`;
        const response = await fetch(requestPath, {credentials: "include"});
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        if (data.message!="Owner"){
          // TODO: Navigate to Home Page
        }
        const profile = data.body;
        setUsername(profile.username);
        setFullName(profile.name);
        setJobHistory(profile.work_history);
        setSkills(profile.skills);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(e);
    }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const payload = { identifier, password };
//       const response = await fetch("http://localhost:4001/api/login", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const profileResponse = await fetch(
//           "http://localhost:4001/api/profile/info",
//           {
//             credentials: "include",
//           },
//         );

//         if (profileResponse.ok) {
//           const profileData = await profileResponse.json();
//           setUserData(profileData.body);
//           toast.success("Login successful");
//           navigate({ to: "/" });
//         }
//       } else {
//         const data = await response.json();
//         toast.error(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("An error occurred during login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  return (
    <div className="bg-gray-light flex min-h-screen flex-col items-center py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl text-gray-dark font-medium"> Edit Profile </h1>
      <div className="px-12 sm:px-36 max-w-screen-lg w-full mx-auto">
        <div className="flex flex-col items-center bg-gray-lighter text-gray-dark px-8 py-12 mt-10 text-center shadow-lg rounded-xl">
          <form className="w-full py-2" onSubmit={handleSubmit}>
            <div className="text-left space-y-8 w-full">
              <div>
                <Label htmlFor="username"> Username </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  className="mt-1 border-2 border-gray-dark"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="full name"> Full Name </Label>
                <Input
                  id="full name"
                  name="full name"
                  type="text"
                  className="border-2 border-gray-dark mt-1"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="new password">New Password</Label>
                <Input
                  id="new password"
                  name="new password"
                  type="password"
                  className="border-2 border-gray-dark mt-1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="confirm password">Confirm Password</Label>
                <Input
                  id="confirm password"
                  name="confirm password"
                  type="password"
                  className="border-2 border-gray-dark mt-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="mt-8">
                <Label htmlFor="profile picture"> Profile Picture </Label>
                <div className="mt-2 flex flex-row items-center justify-start">
                  <Button variant="ghost" className="border-2 border-gray-dark text-md rounded-lg"> Choose Image </Button>
                  <h3 className="text-lg text-gray-dark font-normal ml-2"> File Path </h3>
                </div>
              </div>

              <div className="mt-8 flex flex-col">
                <Label htmlFor="job history" className="mb-2"> Job History </Label>
                <TextArea value={jobHistory} onChange={(newValue : string) => setJobHistory(newValue)} maxLength={1000} initialRow={6} id={"job history"} placeholder={"Write your job history here!"}/>
              </div>

              <div className="mt-8 flex flex-col">
                <Label htmlFor="skills" className="mb-2"> Skills </Label>
                <TextArea value={skills} onChange={(newValue : string) => setSkills(newValue)} maxLength={1000} initialRow={6} id={"skills"} placeholder={"Write your skills here!"}/>
              </div>
            </div>
            <Button
              type="submit"
              variant="default"
              className="bg-blue-secondary w-52 mx-auto mt-8 rounded px-4 py-2 font-lg text-white hover:bg-blue-secondary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Logging in...
                </div>
              ) : (
                "EDITING"
              )}
            </Button>
          </form>

          <Link to="/"> 
            {/* TODO: Adjust Link */}
            <Button
              variant="destructive"
              className="mt-4 w-52 rounded px-4 py-2 font-lg text-white"
              disabled={isLoading}
            >
              DISCARD CHANGES
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
