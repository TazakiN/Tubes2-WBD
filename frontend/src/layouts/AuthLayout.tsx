import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-blue-primary flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-lighter text-gray-dark justify-center px-4 py-12 text-center shadow sm:rounded-2xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
