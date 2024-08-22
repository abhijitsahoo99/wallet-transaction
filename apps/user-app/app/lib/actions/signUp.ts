"use server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";

export default async function signUp(
  name: string,
  number: string,
  password: string
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        number,
        name,
        password: hashedPassword,
      },
    });
    return { status: true, message: "Account created successfully", user };
  } catch (e) {
    console.error(e);
    return { status: false, message: "Error in signing up" };
  }
}
