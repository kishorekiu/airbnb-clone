"use server";

import { signIn, signOut } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function handleGoogleSignIn() {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

export async function handleGitHubSignIn() {
  try {
    await signIn("github", { redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

export async function handleSignOut() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (e) {
    throw e;
  }
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Missing required fields." };
  }

  try {
    await dbConnect();

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "Email already in use." };
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create the user
    await User.create({
      name,
      email,
      hashedPassword,
    });

    return { success: "Account created! You can now log in." };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration." };
  }
}
