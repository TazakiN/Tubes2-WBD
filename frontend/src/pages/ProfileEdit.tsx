import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import FileUpload from "@/components/ui/file-upload";
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
  const [fileName, setFileName] = useState("File Name");
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);
  const jobHistoryRef = useRef<HTMLTextAreaElement>(null);
  const skillsRef = useRef<HTMLTextAreaElement>(null);

  const getUserIdFromUrl = () => {
    const pathParts = window.location.pathname.split("/");
    return pathParts[pathParts.length - 1];
  };

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
  };

  useEffect(() => {
    // const uploadFile = async () => {
    //   try {

    //   } catch(err) {

    //   } finally {

    //   }
    // };

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const user_id = getUserIdFromUrl();
        const requestPath = `${BASE_URL}/profile/${user_id}`;
        const response = await fetch(requestPath, { credentials: "include" });
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        if (data.message != "Owner") {
          navigate({ to: "/" });
        }
        const profile = data.body;
        profile.skills = profile.skills || "";
        profile.work_history = profile.work_history || "";
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
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    if (
      fileRef.current?.name &&
      fileRef.current?.files &&
      fileRef.current.files[0]
    ) {
      formData.append(fileRef.current.name, fileRef.current.files[0]);
    }
    if (jobHistoryRef.current?.name && jobHistoryRef.current?.value) {
      formData.append(jobHistoryRef.current.name, jobHistoryRef.current.value);
    }
    if (skillsRef.current?.name && skillsRef.current?.value) {
      formData.append(skillsRef.current.name, skillsRef.current.value);
    }
    try {
      const user_id = getUserIdFromUrl();
      const requestPath = `${BASE_URL}/profile/${user_id}`;
      const response = await fetch(requestPath, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Login successful");
        navigate({ to: `/profile/${user_id}` });
      }
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

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-light py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-medium text-gray-dark"> Edit Profile </h1>
      <div className="mx-auto w-full max-w-screen-lg px-12 sm:px-36">
        <div className="mt-10 flex flex-col items-center rounded-xl bg-gray-lighter px-8 py-12 text-center text-gray-dark shadow-lg">
          <form className="w-full py-2" onSubmit={handleSubmit}>
            <div className="w-full space-y-8 text-left">
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
                  id="full-name"
                  name="full-name"
                  type="text"
                  className="mt-1 border-2 border-gray-dark"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="new password">New Password</Label>
                <Input
                  id="new-password"
                  name="new-password"
                  type="password"
                  className="mt-1 border-2 border-gray-dark"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="confirm password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  className="mt-1 border-2 border-gray-dark"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="mt-8">
                <Label htmlFor="profile picture"> Profile Picture </Label>
                <div className="mt-2 flex flex-row items-center justify-start">
                  <FileUpload
                    buttonText="Choose Image"
                    className="text-md rounded-lg border-2 border-gray-dark"
                    onFileSelect={handleFileSelect}
                    ref={fileRef}
                    inputName="profile-picture"
                  />
                  <h3 className="ml-2 text-lg font-normal text-gray-dark">
                    {" "}
                    {fileName}{" "}
                  </h3>
                </div>
              </div>

              <div className="mt-8 flex flex-col">
                <Label htmlFor="job history" className="mb-2">
                  {" "}
                  Job History{" "}
                </Label>
                <TextArea
                  value={jobHistory}
                  onChange={(newValue: string) => setJobHistory(newValue)}
                  maxLength={1000}
                  initialRow={6}
                  id={"job history"}
                  placeholder={"Write your job history here!"}
                  inputName="job-history"
                  ref={jobHistoryRef}
                />
              </div>

              <div className="mt-8 flex flex-col">
                <Label htmlFor="skills" className="mb-2">
                  {" "}
                  Skills{" "}
                </Label>
                <TextArea
                  value={skills}
                  onChange={(newValue: string) => setSkills(newValue)}
                  maxLength={1000}
                  initialRow={6}
                  id={"skills"}
                  placeholder={"Write your skills here!"}
                  inputName="skills"
                  ref={skillsRef}
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="default"
              className="font-lg mx-auto mt-8 w-52 rounded bg-blue-secondary px-4 py-2 text-white hover:bg-blue-secondary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Editing...
                </div>
              ) : (
                "Edit Profile"
              )}
            </Button>
          </form>

          <Link to="/">
            {/* TODO: Adjust Link */}
            <Button
              variant="destructive"
              className="font-lg mt-4 w-52 rounded px-4 py-2 text-white"
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
