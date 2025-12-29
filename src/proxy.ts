import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function proxy(req) {
        const { token } = req.nextauth;
        if (token?.role === "ADMIN" && req.nextUrl.pathname.includes("/user")) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
        if (token?.role === "USER" && req.nextUrl.pathname.includes("/admin")) {
            return NextResponse.redirect(new URL("/user", req.url));
        }

        return NextResponse.next(); // Allow access to other paths
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (
                    (req.nextUrl.pathname.includes("/user") ||
                        req.nextUrl.pathname.includes("/admin")) &&
                    !token
                )
                    return false;

                return true;
            },
        },
        pages: {
            signIn: "/auth",
            error: "/auth",
        },
    }
);

export const config = {
    matcher: [
        "/user/:path*",
        "/admin/:path*",
        "/api/user/:path*",
        "/api/admin/:path*",
    ],
};
