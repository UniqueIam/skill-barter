import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create Skills
  await prisma.skill.createMany({
    data: [
      { id: "skill1", name: "Web Development" },
      { id: "skill2", name: "Graphic Design" },
      { id: "skill3", name: "Public Speaking" },
      { id: "skill4", name: "Excel" },
      { id: "skill5", name: "Photoshop" },
      { id: "skill6", name: "Digital Marketing" },
      { id: "skill7", name: "Guitar" },
      { id: "skill8", name: "Cooking" },
    ],
  });

  const users = [
    {
      id: "user1",
      username: "alice",
      email: "alice@example.com",
      location: "Bangalore",
    },
    {
      id: "user2",
      username: "bob",
      email: "bob@example.com",
      location: "Mumbai",
    },
    {
      id: "user3",
      username: "test1",
      email: "test1@example.com",
      location: "Delhi",
    },
    {
      id: "user4",
      username: "test2",
      email: "test2@example.com",
      location: "Kolkata",
    },
    {
      id: "user5",
      username: "test3",
      email: "test3@example.com",
      location: "Kolkata",
    },
    {
      id: "user6",
      username: "test4",
      email: "test4@example.com",
      location: "Pune",
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        profilePhoto: null,
        isPublic: true,
        role: "USER",
        verified: true,
        otp: null,
        otpExpiry: null,
        skillsOffered: {
          create: [
            {
              id: `uso_${user.id}_skill1`,
              skill: { connect: { id: "skill1" } },
            },
            {
              id: `uso_${user.id}_skill2`,
              skill: { connect: { id: "skill2" } },
            },
          ],
        },
        skillsWanted: {
          create: [
            {
              id: `usw_${user.id}_skill3`,
              skill: { connect: { id: "skill3" } },
            },
            {
              id: `usw_${user.id}_skill4`,
              skill: { connect: { id: "skill4" } },
            },
          ],
        },
        availabilities: {
          create: [
            {
              id: `avail_${user.id}_1`,
              day: "MONDAY",
              startTime: "17:00",
              endTime: "19:00",
            },
            {
              id: `avail_${user.id}_2`,
              day: "SATURDAY",
              startTime: "17:00",
              endTime: "19:00",
            },
          ],
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed data inserted successfully.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Error seeding data:", e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
