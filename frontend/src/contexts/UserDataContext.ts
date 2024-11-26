import { UserData } from "@/lib/types/userData";
import { createContext } from "react";

export const UserDataContext = createContext<{
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}>({
  userData: null,
  setUserData: () => {},
});
