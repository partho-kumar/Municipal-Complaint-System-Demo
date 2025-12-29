import { IUserDetails } from "@/types/user";
import { useEffect, useState } from "react";
import getUserDetails from "../actions/get-user-details";

const ProfileTab = () => {
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true);
            const data = await getUserDetails();
            if (data?.success && data?.data) {
                setUserDetails(
                    JSON.parse(data?.data as string) as IUserDetails
                );
            }
            setIsLoading(false);
        };
        fetchUserDetails();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                আমার প্রোফাইল
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">নাম</span>
                    <span className="font-medium">{userDetails?.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">ইমেইল</span>
                    <span className="font-medium">{userDetails?.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">মোবাইল</span>
                    <span className="font-medium">{userDetails?.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">ঠিকানা</span>
                    <span className="font-medium">{userDetails?.address}</span>
                </div>
                <div className="flex justify-between pt-2">
                    <span className="text-gray-500">ধরণ</span>
                    <span className="font-medium text-emerald-600">নাগরিক</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;
