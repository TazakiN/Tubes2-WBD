export interface UserData {
  username: string;
  profile_photo_path: string;
}

export interface ProfileData {
  username?: string;
  profile_photo?: string;
  name?: string;
  work_history?: string;
  skills?: string;
  connection_count?: number;
  relevant_posts?: [];
}

export interface UseAuthReturn {
  isAuthenticated: boolean;
  userData: UserData | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}
