import SessionProvider from "@/providers/SessionProvider";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
    title: "Smart Municipality Portal",
    description:
        "A comprehensive service portal for City Corporation/Municipality services, allowing citizens to report issues and admins to manage them.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <SessionProvider>
                <body
                    className={`${hindSiliguri.className} antialiased flex flex-col min-h-screen`}
                >
                    <Navbar />
                    <div className="grow">{children}</div>
                    <Footer />
                    <Toaster position="top-right" richColors />
                </body>
            </SessionProvider>
        </html>
    );
}
