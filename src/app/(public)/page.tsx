import { authOptions } from "@/lib/auth";
import { COMPLAINT_CATEGORIES } from "@/lib/contants";
import {
    AlertTriangle,
    Baby,
    Construction,
    Droplets,
    FileCheck,
    Lightbulb,
    Store,
    Truck,
    Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const services = [
    { icon: <Truck size={32} />, title: "বর্জ্য ব্যবস্থাপনা" },
    { icon: <Lightbulb size={32} />, title: "সড়ক বাতি রক্ষণাবেক্ষণ" },
    { icon: <Droplets size={32} />, title: "পানি সরবরাহ" },
    { icon: <Construction size={32} />, title: "রাস্তা ও ড্রেন সংস্কার" },
    { icon: <FileCheck size={32} />, title: "ট্রেড লাইসেন্স" },
    { icon: <Baby size={32} />, title: "জন্ম ও মৃত্যু নিবন্ধন" },
    { icon: <AlertTriangle size={32} />, title: "অবৈধ স্থাপনা উচ্ছেদ" },
    { icon: <Store size={32} />, title: "বাজার মনিটরিং" },
    { icon: <Users size={32} />, title: "নাগরিক সেবা ও তথ্য" },
];

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="bg-hero relative bg-secondary text-white py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="front_text_head text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-blue-400">
                        স্মার্ট পৌরসভা সুন্দর জীবন
                    </h1>
                    <p className="front_text_sub text-lg md:text-xl text-blue-400 mb-10 max-w-2xl mx-auto">
                        নাগরিক সেবা এখন হাতের মুঠোয়। আপনার এলাকার যেকোনো সমস্যা
                        বা অভিযোগ আমাদের জানান, আমরা আছি আপনার পাশে।
                    </p>
                    <Link
                        href={
                            session?.user
                                ? session.user.role === "ADMIN"
                                    ? "/admin"
                                    : "/user"
                                : "/auth"
                        }
                        className="bg-accent hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
                    >
                        অভিযোগ করুন
                    </Link>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary mb-3">
                            আমাদের সেবাসমূহ
                        </h2>
                        <div className="w-20 h-1 bg-primary mx-auto"></div>
                        <p className="text-gray-600 mt-4">
                            আমরা নাগরিক জীবনের মান উন্নয়নে নিম্নলিখিত সেবাগুলো
                            প্রদান করে থাকি
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center group"
                            >
                                <div className="text-primary bg-emerald-100 p-4 rounded-full mb-4 group-hover:bg-emerald-200 transition">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {service.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Complaint Categories Highlight */}
            <div className="py-16 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-secondary">
                            কি কি বিষয়ে অভিযোগ জানাতে পারবেন?
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {COMPLAINT_CATEGORIES.slice(0, 8).map((cat, idx) => (
                            <span
                                key={idx}
                                className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200"
                            >
                                {cat}
                            </span>
                        ))}
                        <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                            আরও অনেক...
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        কিভাবে সেবা পাবেন?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-teal-200 mb-4">
                                ১
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                রেজিস্ট্রেশন করুন
                            </h3>
                            <p className="text-gray-600">
                                আপনার নাম ও ফোন নম্বর দিয়ে খুব সহজেই একাউন্ট
                                খুলুন।
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-teal-200 mb-4">
                                ২
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                অভিযোগ জানান
                            </h3>
                            <p className="text-gray-600">
                                সমস্যার ছবি ও বিবরণ দিয়ে ফর্ম পূরণ করে সাবমিট
                                করুন।
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-teal-200 mb-4">
                                ৩
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                সমাধান পান
                            </h3>
                            <p className="text-gray-600">
                                আপনার ড্যাশবোর্ড থেকে অভিযোগের স্ট্যাটাস দেখুন ও
                                সমাধান পান।
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
