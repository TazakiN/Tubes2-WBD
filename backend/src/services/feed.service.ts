import db from "../config/db";

export class FeedService {
  static async getAllFeeds(limit: number) {
    const feeds = await db.feed.findMany({
      take: limit,
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        content: true,
        created_at: true,
        updated_at: true,
        users: {
          select: {
            id: true,
            full_name: true,
            username: true,
            profile_photo_path: true,
          },
        },
      },
    });

    const transformedFeeds = feeds.map((feed) => ({
      id: feed.id.toString(),
      content: feed.content,
      created_at: feed.created_at.toISOString(),
      updated_at: feed.updated_at.toISOString(),
      user: {
        user_id: feed.users.id.toString(),
        full_name: feed.users.full_name || feed.users.username,
        profile_photo_path: feed.users.profile_photo_path,
      },
    }));

    return transformedFeeds;
  }
}
