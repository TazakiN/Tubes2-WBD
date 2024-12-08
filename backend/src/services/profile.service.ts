import db from "../config/db";
import bcrypt from "bcrypt";
import { utapi } from "../utils/uploadthing";

export default class profileService {
  static async getProfileAuthenticated(user_id: bigint) {
    const user = await db.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        username: true,
        full_name: true,
        work_history: true,
        skills: true,
        profile_photo_path: true,
        feed: {
          select: {
            id: true,
            content: true,
            created_at: true,
            updated_at: true,
          },
          orderBy: {
            created_at: "desc",
          },
        },
        _count: {
          select: {
            connection_connection_from_idTousers: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      username: user.username,
      name: user.full_name,
      work_history: user.work_history,
      skills: user.skills,
      profile_photo: user.profile_photo_path,
      relevant_posts: user.feed,
      connection_count: user._count.connection_connection_from_idTousers,
    };
  }

  static async getProfilePublic(user_id: bigint) {
    const user = await db.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        username: true,
        full_name: true,
        work_history: true,
        skills: true,
        profile_photo_path: true,
        _count: {
          select: {
            connection_connection_from_idTousers: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      username: user.username,
      name: user.full_name,
      work_history: user.work_history,
      skills: user.skills,
      profile_photo: user.profile_photo_path,
      connection_count: user._count.connection_connection_from_idTousers,
    };
  }

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
