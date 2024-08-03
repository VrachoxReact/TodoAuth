import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth";
import prisma from "../../../lib/db";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const todos = await prisma.todo.findMany({
    where: { userId: decoded.userId },
  });
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title } = await request.json();
  const todo = await prisma.todo.create({
    data: {
      title,
      userId: decoded.userId,
    },
  });
  return NextResponse.json(todo, { status: 201 });
}
