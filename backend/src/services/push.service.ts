import db from "../config/db";

export class PushService {
  static async getSubsriberByUserId(userId: bigint) {
    console.log("Cari subscriber dengan user_id:", userId);
    return db.push_subscriptions.findMany({
      where: { user_id: userId },
    });
  }

  //   static async subscribe(subscription: any, userId: bigint | null) {
}
