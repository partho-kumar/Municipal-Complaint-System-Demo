import { STATUS_COLORS, TRANSLATED_STATUS } from "@/lib/contants";
import { IComplaint } from "@/types/complaint";
import { AlertCircle, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import updateComplaint from "../actions/update-complaint";

const SingleComplaint = ({
    complaint,
    fetchComplaints,
}: {
    complaint: IComplaint;
    fetchComplaints: () => void;
}) => {
    const { register, handleSubmit, reset, control } = useForm<IComplaint>({
        defaultValues: complaint,
    });
    const statusChanged = useWatch({ control, name: "status" });
    const [showButtons, setShowButtons] = useState<boolean>(false);

    useEffect(() => {
        console.log(statusChanged, complaint.status);
        if (statusChanged && statusChanged != complaint.status) {
            setTimeout(() => {
                setShowButtons(true);
            }, 50);
        } else {
            setTimeout(() => {
                setShowButtons(false);
            }, 50);
        }
    }, [statusChanged, complaint.status]);

    async function handleUpdateComplaint(formData: IComplaint) {
        const { status, _id } = formData;
        const data = await updateComplaint(_id, status);
        if (!data.success) {
            toast.error("অভিযোগ আপডেট করতে ব্যর্থ হয়েছে");
            return;
        }
        toast.success("অভিযোগ সফলভাবে আপডেট করা হয়েছে");
        fetchComplaints();
        setShowButtons(false);
    }

    return (
        <form
            onSubmit={handleSubmit(handleUpdateComplaint)}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
        >
            <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                ID: {complaint._id}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar size={12} />{" "}
                                {new Date(
                                    complaint.createdAt
                                ).toLocaleDateString("en-BD", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            {complaint.category}
                            <span
                                className={`text-xs px-2 py-1 leading-none rounded-full font-medium ${
                                    STATUS_COLORS[
                                        complaint.status as keyof typeof STATUS_COLORS
                                    ]
                                }`}
                            >
                                {
                                    TRANSLATED_STATUS[
                                        complaint.status as keyof typeof TRANSLATED_STATUS
                                    ]
                                }
                            </span>
                        </h3>
                        <p className="text-sm text-emerald-700 font-medium mt-1">
                            {typeof complaint.userId === "string"
                                ? complaint.userId
                                : complaint.userId.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            className={`px-3 py-1 rounded-md text-sm font-medium border cursor-pointer outline-none`}
                            {...register("status", { required: true })}
                        >
                            {Object.keys(STATUS_COLORS).map((s) => (
                                <option
                                    key={s}
                                    value={s}
                                    className={`${
                                        STATUS_COLORS[
                                            s as keyof typeof STATUS_COLORS
                                        ]
                                    }`}
                                >
                                    {
                                        TRANSLATED_STATUS[
                                            s as keyof typeof TRANSLATED_STATUS
                                        ]
                                    }
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className="text-gray-600 bg-gray-50 p-4 rounded-md mb-4">
                    {complaint.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-red-500" />
                        <span>{complaint.location}</span>
                    </div>
                    {complaint.imageUrl && (
                        <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                            <AlertCircle size={16} />
                            <span className="underline">ছবি দেখুন</span>
                        </div>
                    )}
                </div>
                {showButtons && (
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
                            onClick={() => reset()}
                        >
                            বাতিল করুন
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-md text-sm"
                        >
                            সংরক্ষণ করুন
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SingleComplaint;
