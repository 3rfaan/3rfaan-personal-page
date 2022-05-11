import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          value: "admin",
          placeholder: "Name",
        },
        key: { label: "Admin Key", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.key === process.env.ADMIN_KEY) {
          const user = { name: "admin", isAdmin: "true" };

          return {
            token: user,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user; // Setting token in session
      return session;
    },
  },
  theme: {
    colorScheme: "dark",
  },
  secret: process.env.JWT_SECRET,
});
