import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { User } from "./models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("Please provide both email and passeord");

        // connection with db

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        // if user try to connect with google
        if (!user.password) {
          throw new CredentialsSignin("Invalid email or password");
        }

        // hashed password
        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin("Invalid email or password");
        }

        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
});
