//you keep all data about the currently logged in users

import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "@/utils/adapters";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { use } from "react";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // ! it means that the variable could also be undefined
    }),
  ],
  // jwt: {
  //   encode: ({ secret, token }) => {},
  //   decode: async ({ secret, token }) => {},
  // },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      //this gets triggered everytime a user visits the page
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //get user if they exist

        //if they don't exist , create them

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
