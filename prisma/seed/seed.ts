import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // List of skill names to insert if they don't exist already
  const skillNames = [
    "Web Development",
    "Graphic Design",
    "Public Speaking",
    "Excel",
    "Photoshop",
    "Digital Marketing",
    "Guitar",
    "Cooking",
  ];

  // Check if skills exist, and only create them if they don't
  for (const skillName of skillNames) {
    const existingSkill = await prisma.skill.findUnique({
      where: { name: skillName },
    });

    if (!existingSkill) {
      await prisma.skill.create({
        data: { name: skillName },
      });
    }
  }

  const users = [
    {
      username: "alice",
      email: "alice@example.com",
      location: "Bangalore",
      password: "password123", // Default password to hash
    },
    {
      username: "bob",
      email: "bob@example.com",
      location: "Mumbai",
      password: "password123",
    },
    {
      username: "test1",
      email: "test1@example.com",
      location: "Delhi",
      password: "password123",
    },
    {
      username: "test2",
      email: "test2@example.com",
      location: "Kolkata",
      password: "password123",
    },
    {
      username: "test3",
      email: "test3@example.com",
      location: "Kolkata",
      password: "password123",
    },
    {
      username: "test4",
      email: "test4@example.com",
      location: "Pune",
      password: "password123",
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password

    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword, // Store hashed password
        profilePhoto: null,
        isPublic: true,
        role: "USER",
        verified: true,
        otp: null,
        otpExpiry: null,
        skillsOffered: {
          create: [
            {
              skill: { connect: { name: "Web Development" } },
            },
            {
              skill: { connect: { name: "Graphic Design" } },
            },
          ],
        },
        skillsWanted: {
          create: [
            {
              skill: { connect: { name: "Public Speaking" } },
            },
            {
              skill: { connect: { name: "Excel" } },
            },
          ],
        },
        availabilities: {
          create: [
            {
              day: "MONDAY",
              startTime: "17:00",
              endTime: "19:00",
            },
            {
              day: "SATURDAY",
              startTime: "17:00",
              endTime: "19:00",
            },
          ],
        },
      },
    });
  }

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    prisma.$disconnect().finally(() => process.exit(1));
  })
  .finally(async () => {
    await prisma.$disconnect();
  });