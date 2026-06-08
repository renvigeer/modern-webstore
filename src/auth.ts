import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./models/User";
import dbConnect from "./lib/mongodb";
import bcrypt from "bcrypt";

// In-memory user store for demo when MongoDB is unavailable
const inMemoryUsers: any[] = [
  {
    id: "demo1",
    name: "Demo User",
    email: "demo@example.com",
    password: bcrypt.hashSync("demo123", 10),
    role: "user",
    createdAt: new Date()
  }
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, unknown> | undefined) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        let user;
        const db = await dbConnect();
        
        if (db) {
          // Try MongoDB
          user = await User.findOne({ email }).select("+password");
          
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          
          if (!passwordMatch) {
            return null;
          }
          
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } else {
          // Use in-memory store
          user = inMemoryUsers.find((u) => u.email === email);
          
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          
          if (!passwordMatch) {
            return null;
          }
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
});

// Export for signup to use
export { inMemoryUsers };
