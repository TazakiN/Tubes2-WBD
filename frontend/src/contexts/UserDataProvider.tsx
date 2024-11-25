// contexts/UserDataContext.tsx
import React, { useState, useEffect } from "react";
import { UserData } from "@/lib/types/userData";
import { useProfile } from "@/hooks/useProfile";
import { UserDataContext } from "./UserDataContext";

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { profileData } = useProfile();

  useEffect(() => {
    setUserData(profileData);
  }, [profileData]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext };
