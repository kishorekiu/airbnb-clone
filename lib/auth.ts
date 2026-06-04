import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers, // ⚠️ CRITICAL: You missed this line! This brings in Google/GitHub
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "kishore@mail.com" &&
          credentials?.password === "kishore"
        ) {
          return { id: "1", name: "kishore", email: "kishore@mail.com" };
        }
        return null;
      },
    }),
  ],
});
