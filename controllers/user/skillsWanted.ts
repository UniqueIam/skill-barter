import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const skillsWantedByUser = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId, skillName } = body;

    if (!userId || !skillName) {
      return NextResponse.json(
        { error: "userId and skillName are required." },
        { status: 400 }
      );
    }

    // 1. Find or create the skill
    const skill = await prisma.skill.upsert({
      where: { name: skillName },
      update: {},
      create: { name: skillName },
    });

    // 2. Check if user already wants this skill
    const alreadyExists = await prisma.userSkillWanted.findFirst({
      where: {
        userId,
        skillId: skill.id,
      },
    });

    if (alreadyExists) {
      return NextResponse.json(
        { error: "Skill already exists in user's wanted list." },
        { status: 409 }
      );
    }

    // 3. Add to user's wanted list
    const addedSkill = await prisma.userSkillWanted.create({
      data: {
        userId,
        skillId: skill.id,
      },
    });

    return NextResponse.json(
      {
        message: "Skill successfully added to user's wanted list.",
        skill: {
          id: skill.id,
          name: skill.name,
          relationId: addedSkill.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ADD_WANTED_SKILL_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
};
