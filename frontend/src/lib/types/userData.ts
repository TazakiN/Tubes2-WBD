import default_profile_picture from '@/assets/img/default-profile-picture.jpg';

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
}

export function CreateProfileData ({
  username = "",
  profile_photo = default_profile_picture,
  name = "",
  work_history = "",
  skills = "",
  }: ProfileData): ProfileData {
    return {username, profile_photo, name, work_history, skills};
}

export interface UseAuthReturn {
  isAuthenticated: boolean;
  userData: UserData | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}
