import type { NextAuthConfig } from "next-auth"; // ⚠️ Updated to v5 type
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET, // Fixed variable
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID, // Fixed variable
      clientSecret: process.env.AUTH_GITHUB_SECRET, // Fixed variable
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig; // ⚠️ Updated to v5 type
