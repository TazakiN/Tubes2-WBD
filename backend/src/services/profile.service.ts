import db from "../config/db";
import bcrypt from "bcrypt";
import { utapi } from "../utils/uploadthing";

export default class profileService {
  static async getProfileInfo(user_id: bigint) {
    return await db.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        username: true,
        profile_photo_path: true,
      },
    });
  }

  static async getProfile(user_id: bigint) {
    return await db.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        username: true,
        full_name: true,
        work_history: true,
        skills: true,
        profile_photo_path: true,
      },
    });
  }

  // ? Cuman contoh aja, atur atur ae kalo perlu
  static async updateProfile(user_id: bigint, data: UpdateProfileData) {
    const hashed_password = await bcrypt.hash(data.password, 10);
    const response = await utapi.uploadFiles(data.profile_photo);
    const profile_photo_path = response.data?.url;
    return await db.users.update({
      where: {
        id: user_id,
      },
      data: {
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        profile_photo_path: profile_photo_path,
        password_hash: hashed_password,
        work_history: data.work_history,
        skills: data.skills,
      },
    });
  }
}

interface UpdateProfileData {
  email: string;
  username: string;
  full_name: string;
  password: string;
  profile_photo: File;
  work_history: string;
  skills: string;
}
