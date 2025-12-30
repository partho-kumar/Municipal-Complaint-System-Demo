import { connectDB } from "@/lib/db";
import { verifyPassword } from "@/lib/utils";
import User from "@/models/User";
import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt" as const,
        maxAge: 24 * 60 * 60, // 1 day
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials || {};
                if (!email || !password) {
                    throw new Error("ইমেইল এবং পাসওয়ার্ড দিতে হবে!");
                }
                await connectDB();

                const user = await User.findOne({
                    email,
                });

                if (!user) {
                    throw new Error("ইমেইল খুঁজে পাওয়া যায়নি!");
                }

                const isValidPassword = await verifyPassword(
                    password,
                    user.password
                );
                if (!isValidPassword) {
                    throw new Error("পাসওয়ার্ড ভুল!");
                }

                // Map database user to NextAuth User type
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    pages: {
        error: "/auth",
        signIn: "/auth",
    },
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // ✅ use id
                token.name = user.name;
                token.email = user.email;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};
