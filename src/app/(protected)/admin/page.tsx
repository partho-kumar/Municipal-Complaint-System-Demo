"use client";
import { STATUS_COLORS, TRANSLATED_STATUS } from "@/lib/contants";
import { cn } from "@/lib/utils";
import { IComplaint } from "@/types/complaint";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import getComplaints from "./actions/get-complaints";
import SingleComplaint from "./components/SingleComplaint";

const Page = () => {
    const [filter, setFilter] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [complaints, setComplaints] = useState<IComplaint[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchComplaints = async () => {
        setIsLoading(true);
        const data = await getComplaints();
        if (data?.success && data?.data) {
            setComplaints(JSON.parse(data?.data as string) as IComplaint[]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchComplaints = async () => {
            setIsLoading(true);
            const data = await getComplaints();
            if (data?.success && data?.data) {
                setComplaints(JSON.parse(data?.data as string) as IComplaint[]);
            }
            setIsLoading(false);
        };
        fetchComplaints();
    }, []);

    const filteredComplaints = complaints.filter((c: IComplaint) => {
        const matchesFilter =
            filter === "All" || c.status === filter.toLowerCase();
        const matchesSearch =
            c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c._id.toString().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // if (isLoading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary">
                            অ্যাডমিন ড্যাশবোর্ড
                        </h1>
                        <p className="text-gray-600">
                            সকল অভিযোগ পর্যবেক্ষণ এবং আপডেট করুন
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center min-w-[120px]">
                            <span className="text-2xl font-bold text-primary">
                                {complaints.length.toLocaleString("bn-BD")}
                            </span>
                            <span className="text-xs text-gray-500">
                                মোট অভিযোগ
                            </span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center min-w-[120px]">
                            <span className="text-2xl font-bold text-yellow-600">
                                {complaints
                                    .filter(
                                        (c: IComplaint) =>
                                            c.status === "pending"
                                    )
                                    .length.toLocaleString("bn-BD")}
                            </span>
                            <span className="text-xs text-gray-500">
                                অপেক্ষমান
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col lg:flex-row gap-4 justify-between">
                    <div className="relative w-full lg:w-96">
                        <Search
                            className="absolute left-3 top-3 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="আইডি দিয়ে খুঁজুন..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <Filter size={18} className="text-gray-500 shrink-0" />
                        {[
                            "All",
                            "pending",
                            "under_review",
                            "approved",
                            "in_progress",
                            "solved",
                        ].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={cn(
                                    `px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition`,
                                    `${
                                        STATUS_COLORS[
                                            status as keyof typeof STATUS_COLORS
                                        ]
                                    }`,
                                    `
                                    ${
                                        status === "All" &&
                                        "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }
                                    `,
                                    `${
                                        filter === status &&
                                        "bg-secondary text-white"
                                    }`
                                )}
                            >
                                {status === "All"
                                    ? "সব"
                                    : TRANSLATED_STATUS[status]}
                                {status !== "All" && (
                                    <span className="ml-1 font-poppins">
                                        (
                                        {complaints
                                            .filter(
                                                (c: IComplaint) =>
                                                    c.status === status
                                            )
                                            .length.toLocaleString("bn-BD")}
                                        )
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Complaints List */}
                <div className="grid gap-6">
                    {filteredComplaints.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded-lg shadow-sm text-gray-500">
                            কোন অভিযোগ পাওয়া যায়নি।
                        </div>
                    ) : (
                        filteredComplaints.map((complaint: IComplaint) => (
                            <SingleComplaint
                                key={complaint._id}
                                complaint={complaint}
                                fetchComplaints={fetchComplaints}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
