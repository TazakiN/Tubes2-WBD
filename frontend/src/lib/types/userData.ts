export interface UserData {
  username: string;
  profile_photo_path: string;
}

export interface UseAuthReturn {
  isAuthenticated: boolean;
  userData: UserData | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}
