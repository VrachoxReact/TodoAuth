import { NextResponse } from "next/server";
import { createUser } from "../../../lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const user = await createUser(email, password);
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 400 }
    );
  }
}
