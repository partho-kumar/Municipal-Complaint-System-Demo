import { COMPLAINT_CATEGORIES } from "@/lib/contants";
import createComplaintSchema from "@/lib/validators/createComplaint.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import createComplaint from "../actions/create-complaint";

const CreateComplaint = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<z.infer<typeof createComplaintSchema>>({
        defaultValues: {
            category: COMPLAINT_CATEGORIES[0],
            location: "",
            description: "",
        },
        resolver: zodResolver(createComplaintSchema),
    });
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function handleCreateComplaint(
        formData: z.infer<typeof createComplaintSchema>
    ) {
        setSuccessMessage(null);
        setServerError(null);
        const data = await createComplaint(formData);
        if (!data.success) {
            setServerError(data.message);
            return;
        }
        reset();
        toast.success("অভিযোগ সফলভাবে দাখিল করা হয়েছে");
        toast.error(data.message);
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
                অভিযোগ দাখিল করুন
            </h2>
            <form
                onSubmit={handleSubmit(handleCreateComplaint)}
                className="flex flex-col gap-y-6"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        সমস্যার ধরণ নির্বাচন করুন
                    </label>
                    <select
                        {...register("category", { required: true })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    >
                        {COMPLAINT_CATEGORIES.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        এলাকা / লোকেশন
                    </label>
                    <div className="relative">
                        <MapPin
                            className="absolute top-3 left-3 text-gray-400"
                            size={20}
                        />
                        <input
                            {...register("location", { required: true })}
                            required
                            type="text"
                            placeholder="উদাহরণ: ওয়ার্ড নং ৫, কলেজ রোড"
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        বিস্তারিত বিবরণ
                    </label>
                    <textarea
                        rows={4}
                        required
                        placeholder="সমস্যার বিস্তারিত লিখুন..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        {...register("description", { required: true })}
                    />
                </div>

                {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ছবি সংযুক্ত করুন (যদি থাকে)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">
                                    {imageFile ? imageFile.name : "ক্লিক করে ছবি আপলোড করুন"}
                                </p>
                            </div>
                        </div> */}

                {errors && (
                    <div className="flex flex-col gap-1">
                        {Object.keys(errors).map((key) => (
                            <p key={key} className="text-sm text-red-600">
                                {errors[key as keyof typeof errors]?.message}
                            </p>
                        ))}
                    </div>
                )}
                {serverError && (
                    <p className="text-sm text-red-600">{serverError}</p>
                )}
                {successMessage && (
                    <p className="text-sm text-green-600 text-center">
                        {successMessage}
                    </p>
                )}

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-primary hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting && <Loader2 className="animate-spin me-2" />}
                    সাবমিট করুন
                </button>
            </form>
        </div>
    );
};

export default CreateComplaint;
