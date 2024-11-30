import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import person_svg from '@/assets/svg/person.svg';
import { ProfileData } from "@/lib/types/userData";

interface ProfileLayoutProps {
  children?: ReactNode;
  profile: ProfileData;
  connection_count: number;
}

export function ProfileLayout({ children, profile, connection_count }: ProfileLayoutProps) {
  console.log("received profile: ");
  return (
    <div className="min-h-screen bg-gray-light">
      <div className="flex flex-col justify-center py-12 sm:px-24 max-w-screen-lg w-full mx-auto">
        <div className="overflow-hidden rounded-t-2xl bg-blue-secondary h-32"></div>
        <img
          className="relative -top-20 ml-6 sm:ml-10 lg:ml-16 h-32 w-32 rounded-full border-4 border-gray-lighter"
          src={profile.profile_photo}
          alt={"Profile picture of " + profile.username}
        />
        <div className="overflow-hidden rounded-b-2xl -mt-32 bg-gray-lighter px-4 shadow">
          <div className="flex flex-col mt-16 ml-6 sm:ml-10 lg:ml-16">
            <div className="flex flex-row">
              <img className="w-8 h-8" src={person_svg} alt="Person Icon"/>
              <h2 className="text-2xl text-gray-dark font-medium ml-1"> {profile.name} </h2>
            </div>

            <Link
              to="/connection"
              className="text-md text-blue-secondary font-medium ml-1 mt-4 mb-10"
            >
              {connection_count + " Connections"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
