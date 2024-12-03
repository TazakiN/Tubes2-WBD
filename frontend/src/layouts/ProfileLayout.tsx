import person_svg from '@/assets/svg/person.svg';
import { ProfileData } from "@/lib/types/userData";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import TextCard from '@/components/ui/text-card';

interface ProfileLayoutProps {
  profile: ProfileData;
  authenticated: boolean;
  owner: boolean;
}

const UnauthenticatedComponent = () => {
  return (
    <div className="mt-8 mx-auto flex flex-col items-center">
      <h2 className="text-2xl text-gray-dark font-large"> Login or Sign up to see more! </h2>
      <div className="w-4/5 flex flex-row mt-6 justify-around">
        <Link to="/login">
          <Button
            className="rounded bg-black px-6 py-4 text-white text-base"
            variant="default"
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            className="rounded bg-black px-4 py-4 text-white text-base"
            variant="default"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface AuthenticatedComponentProps {
  work_history? : string;
  skills?: string;
}

const AuthenticatedComponent = ({work_history, skills} : AuthenticatedComponentProps) => {
  return (
    <div className="w-full mt-4 mx-auto flex flex-col items-center">
      {work_history && <TextCard title="Job History" content={work_history} className="mb-4"/>}
      {skills && <TextCard title="Skills" content={skills} className="mb-4"/>}
    </div>
  );
}

const ProfileConditionalButton = ({ type }) => {
  const pathParts = window.location.pathname.split("/");
  const user_id = pathParts[pathParts.length - 1];
  switch (type) {
    case "Owner":
      return (
          <Link to={`/profile/edit/${user_id}`}>
            <Button variant="default" className='bg-green rounded-full text-base px-6 py-4 mt-4 hover:bg-green/90'> Edit Profile </Button>
          </Link>
        );
    case "Connected":
      return <Button variant="destructive" className='rounded-full text-base px-6 py-4 mt-4'> Remove Connection </Button>;
    case "Pending":
      return <Button variant="default" className='bg-green rounded-full text-base px-6 py-4 mt-4 hover:bg-green/90'> Pending </Button>;
    case "Not Connected":
      return <Button variant="default" className='bg-blue-primary rounded-full text-base px-6 py-4 mt-4 hover:bg-blue-primary/90'> Connect </Button>;
  }
}

export function ProfileLayout({ profile, authenticated, owner }: ProfileLayoutProps) {
  let children : ReactNode;
  if (authenticated){
    children = <AuthenticatedComponent work_history={profile.work_history} skills={profile.skills}/>
  } else {
    children = <UnauthenticatedComponent/>
  }
  let buttonType;
  if (owner){
    buttonType = "Owner";
  } else {
    buttonType = "Not";
  }
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
          <div className="flex flex-col items-start mt-16 pb-10 ml-6 sm:ml-10 lg:ml-16">
            <div className="flex flex-row">
              <img className="w-8 h-8" src={person_svg} alt="Person Icon"/>
              <h2 className="text-2xl text-gray-dark font-medium ml-1"> {profile.name} </h2>
            </div>

            <Link
              to="/connection"
              className="text-md text-blue-secondary font-medium ml-1 mt-4"
            >
              {profile.connection_count + " Connections"}
            </Link>

            <ProfileConditionalButton type={buttonType}/>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
