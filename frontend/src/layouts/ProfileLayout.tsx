import person_svg from "@/assets/svg/person.svg";
import { ProfileData } from "@/lib/types/userData";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import TextCard from "@/components/ui/text-card";

interface ProfileLayoutProps {
  profile: ProfileData;
  authenticated: boolean;
  owner: boolean;
}

const UnauthenticatedComponent = () => {
  return (
    <div className="mx-auto mt-8 flex flex-col items-center">
      <h2 className="font-large text-2xl text-gray-dark">
        {" "}
        Login or Sign up to see more!{" "}
      </h2>
      <div className="mt-6 flex w-4/5 flex-row justify-around">
        <Link to="/login">
          <Button
            className="rounded bg-black px-6 py-4 text-base text-white"
            variant="default"
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            className="rounded bg-black px-4 py-4 text-base text-white"
            variant="default"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface AuthenticatedComponentProps {
  work_history?: string;
  skills?: string;
}

const AuthenticatedComponent = ({
  work_history,
  skills,
}: AuthenticatedComponentProps) => {
  return (
    <div className="mx-auto mt-4 flex w-full flex-col items-center">
      {work_history && (
        <TextCard title="Job History" content={work_history} className="mb-4" />
      )}
      {skills && <TextCard title="Skills" content={skills} className="mb-4" />}
    </div>
  );
};

interface ProfileConditionalButtonProps {
  type: "Owner" | "Connected" | "Pending" | "Not Connected";
}

const ProfileConditionalButton = ({ type }: ProfileConditionalButtonProps) => {
  const pathParts = window.location.pathname.split("/");
  const user_id = pathParts[pathParts.length - 1];
  switch (type) {
    case "Owner":
      return (
        <Link to={`/profile/edit/${user_id}`}>
          <Button
            variant="default"
            className="mt-4 rounded-full bg-green px-6 py-4 text-base hover:bg-green/90"
          >
            {" "}
            Edit Profile{" "}
          </Button>
        </Link>
      );
    case "Connected":
      return (
        <Button
          variant="destructive"
          className="mt-4 rounded-full px-6 py-4 text-base"
        >
          {" "}
          Remove Connection{" "}
        </Button>
      );
    case "Pending":
      return (
        <Button
          variant="default"
          className="mt-4 rounded-full bg-green px-6 py-4 text-base hover:bg-green/90"
        >
          {" "}
          Pending{" "}
        </Button>
      );
    case "Not Connected":
      return (
        <Button
          variant="default"
          className="mt-4 rounded-full bg-blue-primary px-6 py-4 text-base hover:bg-blue-primary/90"
        >
          {" "}
          Connect{" "}
        </Button>
      );
  }
};

export function ProfileLayout({
  profile,
  authenticated,
  owner,
}: ProfileLayoutProps) {
  let children: ReactNode;
  if (authenticated) {
    children = (
      <AuthenticatedComponent
        work_history={profile.work_history}
        skills={profile.skills}
      />
    );
  } else {
    children = <UnauthenticatedComponent />;
  }
  let buttonType;
  if (owner) {
    buttonType = "Owner";
  } else {
    buttonType = "Not";
  }
  return (
    <div className="min-h-screen bg-gray-light">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col justify-center py-12 sm:px-24">
        <div className="h-32 overflow-hidden rounded-t-2xl bg-blue-secondary"></div>
        <img
          className="relative -top-20 ml-6 h-32 w-32 rounded-full border-4 border-gray-lighter sm:ml-10 lg:ml-16"
          src={profile.profile_photo}
          alt={"Profile picture of " + profile.username}
        />
        <div className="-mt-32 overflow-hidden rounded-b-2xl bg-gray-lighter px-4 shadow">
          <div className="ml-6 mt-16 flex flex-col items-start pb-10 sm:ml-10 lg:ml-16">
            <div className="flex flex-row">
              <img className="h-8 w-8" src={person_svg} alt="Person Icon" />
              <h2 className="ml-1 text-2xl font-medium text-gray-dark">
                {" "}
                {profile.name}{" "}
              </h2>
            </div>

            <Link
              to="/connections"
              className="text-md ml-1 mt-4 font-medium text-blue-secondary"
            >
              {profile.connection_count + " Connections"}
            </Link>

            <ProfileConditionalButton
              type={buttonType as ProfileConditionalButtonProps["type"]}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
