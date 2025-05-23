import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userAgent } from "next/server";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req: Request) => {
        let user = null;
        const values = await validationSchema.validate(credentials);
        const { os, browser } = userAgent(req);
        const forwarded = req.headers.get("x-forwarded-for");
        let ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

        if (ip === "::1") {
          ip = "127.0.0.1";
        }

        const result = await fetch("http://127.0.0.1:5001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, ip, os, browser }),
        });

        if (result.ok) {
          const data = await result.json();

          user = {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
          };
        } else {
          return null;
        }

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt({ token, trigger, user, session }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === "update") {
        token = { ...token, ...session.user };
      }

      return token;
    },
    session({ session, token, user }) {
      if (token.id) session.user.id = token.id as string;
      if (token.email) session.user.email = token.email as string;
      if (token.name) session.user.name = token.name as string;
      session.user.image = token.image as string;

      return session;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     options: {
  //       path: '/',
  //       sameSite: 'lax',
  //       httpOnly: true,
  //       secure: false,
  //     },
  //   },
  // }
});
