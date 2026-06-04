"use server"; // ⚠️ CRITICAL: This must be the absolute first line of code

import { signIn } from "@/lib/auth";

export async function handleGoogleSignIn() {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    // NextAuth redirects throw an intentional error under the hood.
    // We rethrow it so Next.js can handle the redirect path.
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
