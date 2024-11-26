import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import { ProfileData, DefaultProfile} from "@/lib/types/userData";
import default_profile_picture from '@/assets/img/default-profile-picture.jpg';

const Profile = () => {
    const { user_id } = useParams<{ user_id: string }>();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileData>(DefaultProfile({username : "",
      profile_photo : default_profile_picture,
      name : "",
      work_history : "",
      skills : "",
      connection_count : 0,}));
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/profile/${user_id}`);
          if (!response.ok) throw new Error("User not found");
          const data = await response.json();
          setProfileData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }, [user_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <ProfileLayout profile={profileData}/>
    );
  };
  
  export default Profile;
  