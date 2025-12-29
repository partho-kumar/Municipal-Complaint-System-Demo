"use client";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-secondary">
                        {isLogin
                            ? "আপনার অ্যাকাউন্টে লগইন করুন"
                            : "নতুন অ্যাকাউন্ট তৈরি করুন"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin
                            ? "অভিযোগ জানাতে এবং ট্র্যাক করতে লগইন করুন"
                            : "আপনার ব্যক্তিগত তথ্য দিয়ে রেজিস্ট্রেশন করুন"}
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {isLogin ? <Login /> : <Signup />}
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        className="text-sm font-medium text-primary hover:text-emerald-800 cursor-pointer"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin
                            ? "কোন অ্যাকাউন্ট নেই? রেজিস্ট্রেশন করুন"
                            : "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
