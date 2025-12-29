import { STATUS_COLORS, TRANSLATED_STATUS } from "@/lib/contants";
import { IComplaint } from "@/types/complaint";
import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import getUserComplaint from "../actions/get-user-complaint";

const ComplaintListTab = () => {
    const [myComplaints, setMyComplaints] = useState<IComplaint[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserComplaint = async () => {
            setIsLoading(true);
            const data = await getUserComplaint();
            setIsLoading(false);
            if (data?.success && data?.data) {
                setMyComplaints(
                    JSON.parse(data?.data as string) as IComplaint[]
                );
            }
        };
        fetchUserComplaint();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
                আমার অভিযোগের তালিকা
            </h2>
            {myComplaints.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    আপনার কোন অভিযোগ নেই।
                </div>
            ) : (
                <div className="space-y-4">
                    {myComplaints.map((complaint) => (
                        <div
                            key={complaint._id}
                            className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-800">
                                    {complaint.category}
                                </h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                        STATUS_COLORS[complaint.status]
                                    }`}
                                >
                                    {TRANSLATED_STATUS[complaint.status]}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-2 text-sm line-clamp-2">
                                {complaint.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-4 pt-3 border-t">
                                <div className="flex items-center gap-1">
                                    <Clock size={14} /> {complaint.createdAt}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} /> {complaint.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplaintListTab;
