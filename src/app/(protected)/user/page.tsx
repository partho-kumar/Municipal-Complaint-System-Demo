"use client";
import { List, PlusCircle, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ComplaintListTab from "./components/ComplaintListTab";
import CreateComplaint from "./components/CreateComplaint";
import ProfileTab from "./components/ProfileTab";

const Page = () => {
    const [activeTab, setActiveTab] = useState<"create" | "list" | "profile">(
        "create"
    );
    const { data: session, status } = useSession();

    if (status === "loading") return <div>Loading...</div>;

    if (!session?.user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[90vh] flex">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row grow">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 bg-secondary text-white p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-600">
                        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-xl font-bold">
                            {session?.user?.name?.charAt(0) ?? "U"}
                        </div>
                        <div>
                            <p className="font-bold">{session?.user?.name}</p>
                            <p className="text-xs text-gray-300">নাগরিক</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setActiveTab("create")}
                        className={`flex items-center gap-3 p-3 rounded-lg transition ${
                            activeTab === "create"
                                ? "bg-primary"
                                : "hover:bg-emerald-900"
                        }`}
                    >
                        <PlusCircle size={20} /> নতুন অভিযোগ
                    </button>
                    <button
                        onClick={() => setActiveTab("list")}
                        className={`flex items-center gap-3 p-3 rounded-lg transition ${
                            activeTab === "list"
                                ? "bg-primary"
                                : "hover:bg-emerald-900"
                        }`}
                    >
                        <List size={20} /> আমার অভিযোগসমূহ
                    </button>
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-3 p-3 rounded-lg transition ${
                            activeTab === "profile"
                                ? "bg-primary"
                                : "hover:bg-emerald-900"
                        }`}
                    >
                        <User size={20} /> প্রোফাইল
                    </button>
                </div>

                {/* Content Area */}
                <div className="grow p-8 bg-gray-50">
                    {/* Create Complaint Tab */}
                    {activeTab === "create" && <CreateComplaint />}

                    {/* List Tab */}
                    {activeTab === "list" && <ComplaintListTab />}

                    {/* Profile Tab */}
                    {activeTab === "profile" && <ProfileTab />}
                </div>
            </div>
        </div>
    );
};

export default Page;
