import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { addUserSkillSchema } from "@/zodSchemas/addUserSkillSchema";

export const addUserSkill = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = addUserSkillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { userId, skillName, type } = parsed.data;

    // 1. Create or find the skill
    const skill = await prisma.skill.upsert({
      where: { name: skillName },
      update: {},
      create: { name: skillName },
    });

    // 2. Check if mapping already exists
    const exists =
      type === "offered"
        ? await prisma.userSkillOffered.findFirst({
            where: { userId, skillId: skill.id },
          })
        : await prisma.userSkillWanted.findFirst({
            where: { userId, skillId: skill.id },
          });

    if (exists) {
      return NextResponse.json(
        {
          message: "Skill already exists for the user",
          skill: { name: skillName, status: "already_exists" },
        },
        { status: 200 }
      );
    }

    // 3. Create mapping
    const relation =
      type === "offered"
        ? await prisma.userSkillOffered.create({
            data: { userId, skillId: skill.id },
          })
        : await prisma.userSkillWanted.create({
            data: { userId, skillId: skill.id },
          });

    return NextResponse.json(
      {
        message: "Skill added successfully",
        skill: {
          name: skillName,
          status: "added",
          relationId: relation.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ADD_USER_SKILL_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
