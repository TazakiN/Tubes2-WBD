import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const defaultPP =
  "https://utfs.io/f/sSGG1cZ5sLHRjk0AwoMlDzsxaHvRBTV7LNtb8F3CmgidkIj9";
const defaultPassword = "123123";

async function main() {
  await prisma.chat.deleteMany();
  await prisma.connection.deleteMany();
  await prisma.connection_request.deleteMany();
  await prisma.feed.deleteMany();
  await prisma.push_subscriptions.deleteMany();
  await prisma.users.deleteMany();

  const users = await Promise.all([
    prisma.users.create({
      data: {
        username: "john_doe",
        email: "john.doe@example.com",
        password_hash: await bcrypt.hash(defaultPassword, 10),
        full_name: "John Doe",
        work_history: "Software Engineer at Tech Corp",
        skills: "JavaScript, React, Node.js",
        profile_photo_path: defaultPP,
        updated_at: new Date(),
      },
    }),
    prisma.users.create({
      data: {
        username: "jane_smith",
        email: "jane.smith@example.com",
        password_hash: await bcrypt.hash(defaultPassword, 10),
        full_name: "Jane Smith",
        work_history: "Product Manager at Innovation Inc",
        skills: "Product Management, Agile, UX Design",
        profile_photo_path: defaultPP,
        updated_at: new Date(),
      },
    }),
    prisma.users.create({
      data: {
        username: "mike_johnson",
        email: "mike.johnson@example.com",
        password_hash: await bcrypt.hash(defaultPassword, 10),
        full_name: "Mike Johnson",
        work_history: "Data Scientist at Analytics Co",
        skills: "Python, Machine Learning, Data Analysis",
        profile_photo_path: defaultPP,
        updated_at: new Date(),
      },
    }),
  ]);

  await prisma.connection.createMany({
    data: [
      {
        from_id: users[0].id,
        to_id: users[1].id,
        created_at: new Date(),
      },
      {
        from_id: users[1].id,
        to_id: users[2].id,
        created_at: new Date(),
      },
    ],
  });

  await prisma.connection_request.createMany({
    data: [
      {
        from_id: users[2].id,
        to_id: users[0].id,
        created_at: new Date(),
      },
    ],
  });

  await prisma.chat.createMany({
    data: [
      {
        from_id: users[0].id,
        to_id: users[1].id,
        message: "Hi Jane, how are you?",
        timestamp: new Date(),
      },
      {
        from_id: users[1].id,
        to_id: users[0].id,
        message: "Hey John, I'm doing great!",
        timestamp: new Date(),
      },
    ],
  });

  await prisma.feed.createMany({
    data: [
      {
        user_id: users[0].id,
        content: "Just completed an amazing project!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: users[1].id,
        content: "Excited to share some new insights on product management.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  });

  await prisma.push_subscriptions.createMany({
    data: [
      {
        user_id: users[0].id,
        endpoint: "https://example.com/push/john_doe",
        keys: {
          p256dh: "some_p256dh_key",
          auth: "some_auth_key",
        },
        created_at: new Date(),
      },
    ],
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
