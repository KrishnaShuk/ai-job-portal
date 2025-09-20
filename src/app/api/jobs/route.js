import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    try {
        const jobs = await prisma.job.findMany({
  where: {
    category: {
      name: "DESIGN",
    },
  },
  include: {
    company: true,
    category: true,
    skills: { include: { skill: true } },
  },
  orderBy: { postedAt: "desc" },
  take: 5,
});


return NextResponse.json({
            jobs
        });
    } catch (error) {
        return NextResponse.json({
            msg: 'Failed to retrieve authors',
            error: error.message
        }, { status: 500 });
    }
};