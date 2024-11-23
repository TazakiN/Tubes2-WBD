import { ReactNode } from "react";
import linkedInLogo from "@/assets/linkedin.svg";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src={linkedInLogo}
          alt="Linkinpurry"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
