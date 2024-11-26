import { ReactNode } from "react";
import default_profile_picture from '@/assets/default-profile-picture.jpg'

interface ProfileLayoutProps {
  name: string;
  profile_picture: string;
  num_connection: number;
  children: ReactNode;

}

export function ProfileLayout({ name = "Olajide Olayinka Williams", profile_picture = default_profile_picture, num_connection = 0, children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-light">
      <div className="flex flex-col justify-center py-12 sm:px-24 max-w-screen-lg w-full mx-auto">
        <div className="bg-blue-secondary h-24 rounded-t-lg"></div>
        <img
          className="mx-auto h-32 w-auto rounded-full border-4 border-white"
          src={profile_picture}
          alt={"Profile picture of " + name}
        />
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
