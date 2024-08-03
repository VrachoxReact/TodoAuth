import { NextResponse } from "next/server";
import {
  getUserByEmail,
  verifyPassword,
  generateToken,
} from "../../../lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }
  const token = generateToken(user.id);
  return NextResponse.json({ token });
}
