"use client";

import { Building2, Home, LogOut, Menu, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    const handleLogout = () => {
        signOut({
            callbackUrl: "/auth",
        });
    };

    return (
        <nav className="bg-slate-800/50 text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="bg-white p-1 rounded-full text-primary">
                            <Building2 size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-wide hidden sm:block">
                            পৌরসভা সার্ভিস পোর্টাল
                        </span>
                        <span className="font-bold text-xl tracking-wide sm:hidden">
                            পৌরসেবা
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/"
                                className="hover:bg-primary px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition"
                            >
                                <Home size={16} /> হোম
                            </Link>

                            {session?.user ? (
                                <>
                                    <Link
                                        href={
                                            session.user.role === "ADMIN"
                                                ? "/admin"
                                                : "/user"
                                        }
                                        className="hover:bg-primary px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition"
                                    >
                                        <User size={16} /> {session.user.name}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition"
                                    >
                                        <LogOut size={16} /> লগআউট
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/auth"
                                    className="bg-accent hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition"
                                >
                                    <User size={16} /> লগইন / রেজিস্টার
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-emerald-900 pb-4">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-300 hover:bg-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            হোম
                        </Link>

                        {session?.user ? (
                            <>
                                <Link
                                    href={
                                        session.user.role === "ADMIN"
                                            ? "/admin"
                                            : "/user"
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-gray-300 hover:bg-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    প্রোফাইল / ড্যাশবোর্ড
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:bg-red-600 w-full text-left block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    লগআউট
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-300 hover:bg-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                লগইন / রেজিস্টার
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

