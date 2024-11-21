import { users } from "@prisma/client";

export class User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: bigint,
    username: string,
    email: string,
    password_hash: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id.toString();
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromPrisma(dbUser: users): User {
    return new User(
      dbUser.id,
      dbUser.username,
      dbUser.email,
      dbUser.password_hash,
      dbUser.created_at,
      dbUser.updated_at
    );
  }

  static toPrisma(user: User): users {
    return {
      id: BigInt(user.id),
      username: user.username,
      email: user.email,
      password_hash: user.password_hash,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
