//you keep all data about the currently logged in users

import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "@/utils/adapters";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { use } from "react";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

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
      const email = session?.user?.email as string;
      try {
        const data = (await getUser(email)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data.user,
          }, // With the new session we are moving from google session -> our own session
          // since our own session has more variables that need to be filled
        };
        return newSession;
      } catch (error) {
        console.log("Error Retrieving User Data", error);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //get user if they exist
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        }; //you get the user by passing the email as a string | the output will be as a UserProfile

        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
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
